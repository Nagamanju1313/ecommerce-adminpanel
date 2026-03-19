import { NextResponse } from "next/server";
import userAuth from "../../api_utils/userAuthentication";
import pool from "../../../../lib/db";
import { isEmptyArray, isEmptyVariable } from "../../../util/util_functions";
import { checkDuplicate } from "../../api_utils/checkduplicate";

export async function POST(req) {
    try {
        const { user_id, organization_id } = await userAuth(req.cookies.get('token')?.value);

        const { first_name, last_name, email_id, password } = await req.json();

        if (isEmptyVariable(first_name)) {
            throw new Error("first_name must be supplied")
        }
        if (isEmptyVariable(last_name)) {
            throw new Error("last_name must be supplied")
        }
        if (isEmptyVariable(email_id)) {
            throw new Error("email_id must be supplied")
        }
        if (isEmptyVariable(password)) {
            throw new Error("password must be supplied")
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        await checkDuplicate('email_id', email_id, 'users', ` AND organization_id = ${organization_id}`)

        let res = await pool.query(`INSERT INTO users (first_name, last_name, organization_id, 
            user_type, email_id, password_hash, created_by)
            VALUES (${first_name}, ${last_name}, ${organization_id}, ${"ADMIN"}, ${email_id}, ${hashedPassword},
            ${user_id})`);

        return NextResponse.json({
            status: "SUCCESS",
            data: res,
            message: "Data inserted successfully"
        })
    } catch (error) {
        return NextResponse.json({
            status: "FAILURE",
            data: [],
            message: error.message
        })
    }
}