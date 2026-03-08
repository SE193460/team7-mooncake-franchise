import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../../lib/db";

export async function GET(request: NextRequest) {
    try {
        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const filter = searchParams.get('filter') || 'all';
        const keyword = searchParams.get('keyword') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;

        // Build WHERE clause based on filter
        let whereClause = "WHERE o.status IN ('fulfilled', 'confirmed')";
        const queryParams: any[] = [];
        let paramIndex = 1;

        if (filter === 'delivered') {
            whereClause += " AND o.status = 'fulfilled' AND o.delivered_at IS NOT NULL";
        } else if (filter === 'confirmed') {
            whereClause += " AND o.status = 'confirmed' AND o.received_confirmed_at IS NOT NULL";
        }

        // Add keyword search if provided
        if (keyword) {
            whereClause += ` AND o.order_code ILIKE $${paramIndex}`;
            queryParams.push(`%${keyword}%`);
            paramIndex++;
        }

        // Add pagination parameters
        queryParams.push(limit, offset);

        // Query to fetch orders
        const query = `
            SELECT 
                o.order_id,
                o.order_code,
                o.status,
                o.created_at,
                o.delivered_at,
                o.received_confirmed_at
            FROM orders o
            ${whereClause}
            ORDER BY o.created_at DESC
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
        `;

        const result = await pool.query(query, queryParams);

        return NextResponse.json({
            success: true,
            data: result.rows,
            message: null
        });

    } catch (error) {
        console.error('Error fetching receive-confirm orders:', error);
        
        return NextResponse.json({
            success: false,
            data: [],
            message: 'Database connection failed'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { order_id, rating, feedback } = body;

        if (!order_id) {
            return NextResponse.json({
                success: false,
                message: 'Order ID is required'
            }, { status: 400 });
        }

        // Update order with confirmation details
        const query = `
            UPDATE orders
            SET 
                status = 'confirmed',
                received_confirmed_at = NOW(),
                rating = $1,
                feedback = $2
            WHERE order_id = $3
            RETURNING *
        `;

        const result = await pool.query(query, [rating || null, feedback || null, order_id]);

        if (result.rows.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Order not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: result.rows[0],
            message: 'Order confirmed successfully'
        });

    } catch (error) {
        console.error('Error confirming order receipt:', error);
        
        return NextResponse.json({
            success: false,
            message: 'Database connection failed - cannot confirm order'
        }, { status: 500 });
    }
}
