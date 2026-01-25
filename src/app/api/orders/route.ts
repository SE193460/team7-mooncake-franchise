// src/app/api/orders/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
        { id: 1, status: "PENDING" },
        { id: 2, status: "DELIVERED" }
    ]);
}
