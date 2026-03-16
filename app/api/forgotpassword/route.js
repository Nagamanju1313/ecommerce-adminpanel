import { NextResponse } from "next/server";
import pool from "../../lib/db";
import {isEmptyArray} from '../../util/util_functions'
export async function POST(req) {
    try {

        const { email_id } = await req.json();

        let [user] = await pool.query(`SELECT * FROM users WHERE email_id ='${email_id}'`);

        if (isEmptyArray(user)) {
            throw new Error("Email Id does not exists!!")
        }

        return NextResponse.json({
            status: "SUCCESS",
            data: user?.[0]?.email_id
        })

    } catch (error) {
        return NextResponse.json({
            status: "FAILURE",
            message: error.message
        })
    }
}