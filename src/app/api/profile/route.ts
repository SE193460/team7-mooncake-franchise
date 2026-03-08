import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function PATCH(request: NextRequest) {
    try {
        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized - No token provided'
            }, { status: 401 });
        }

        const token = authHeader.substring(7);
        const body = await request.json();
        const { username } = body;

        // Validation
        if (!username || username.trim().length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Username is required'
            }, { status: 400 });
        }

        if (username.length < 2 || username.length > 100) {
            return NextResponse.json({
                success: false,
                message: 'Username must be between 2 and 100 characters'
            }, { status: 400 });
        }

        // In production, decode JWT to get user_id
        // For now, use mock user_id
        const userId = "4"; // Mock user ID

        try {
            // Update username in database
            const query = `
                UPDATE users
                SET username = $1, updated_at = NOW()
                WHERE user_id = $2
                RETURNING user_id, username, email, role, status, franchise_store_id, central_kitchen_id
            `;

            const result = await pool.query(query, [username, userId]);

            if (result.rows.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: 'User not found'
                }, { status: 404 });
            }

            return NextResponse.json({
                success: true,
                data: result.rows[0],
                message: 'Profile updated successfully'
            });

        } catch (dbError) {
            console.error('Database error:', dbError);
            throw new Error('Database connection failed - cannot update profile');
        }

    } catch (error) {
        console.error('Error in PATCH /api/profile:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}
