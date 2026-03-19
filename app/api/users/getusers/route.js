import { NextResponse } from "next/server";
import userAuth from "../../../api_utils/userAuthentication";
import pool from "../../../../lib/db";

export async function POST(req) {
    try {
        const { user_id } = await userAuth(req.cookies.get('token')?.value);
        let res = await pool.query(`SELECT * FROM users WHERE created_by = ${user_id}`);
        return NextResponse.json({
            status: "SUCCESS",
            data: res,
            message: "Data retrieved successfully"
        })
    } catch (error) {
        return NextResponse.json({
            status: "FAILURE",
            data: [],
            message: error.message
        })
    }
}