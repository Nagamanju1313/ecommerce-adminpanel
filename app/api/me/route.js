// This API checks who is currently logged in.
// It reads the JWT token from cookies, verifies it using jsonwebtoken, and returns user data.
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    //browser automatically send cookies to post
    const token = await req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({
            status: "FAILURE",
            message: 'Not Logged in'
        })
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.json({
            status: "SUCCESS",
            user: decoded
        });

    } catch (error) {
        return NextResponse.json({
            status: "FAILURE",
            message: "Invalid token"
        });
    }
}