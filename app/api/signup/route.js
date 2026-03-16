import { NextResponse } from "next/server";
import pool from "../../lib/db";
import { isEmptyArray, isEmptyVariable } from '../../util/util_functions'
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        let { first_name, last_name, organization_name, email_id, password } = await req.json();
        if (isEmptyVariable(first_name)) {
            throw new Error(`First Name must be supplied!`)
        };

        if (isEmptyVariable(last_name)) {
            throw new Error(`Last Name must be supplied!`)
        };

        if (isEmptyVariable(organization_name)) {
            throw new Error(`Organization Name must be supplied!`)
        };

        if (isEmptyVariable(email_id)) {
            throw new Error(`EmailID must be supplied!`)
        };

        if (isEmptyVariable(password)) {
            throw new Error(`Password must be supplied!`)
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const [orgRes] = await pool.query(`SELECT * FROM organization WHERE organization_name = '${organization_name}'
            AND email_id = '${email_id}' `);

        if (!isEmptyArray(orgRes)) {
            throw new Error("Email ID Or Organization already exists")
        }

        let userId = Math.floor((Math.random() * 100000) + 1)

        let [orgInsert] = await pool.query(`INSERT INTO organization (organization_name, email_id) 
            VALUES ('${organization_name}', '${email_id}')`);

        if (isEmptyVariable(orgInsert.insertId)) {
            throw new Error("Organization Not inserted successfully");
        }

        let [userInsert] = await pool.query(`INSERT INTO users 
            (user_id, first_name, last_name, organization_id, user_type, email_id, password_hash, created_by)
            VALUES (${userId}, '${first_name}','${last_name}', ${orgInsert.insertId}, "ADMIN", '${email_id}', 
            '${hashedPassword}', ${userId})`);


        if (isEmptyVariable(userInsert.insertId)) {
            throw new Error("User Not inserted successfully")
        }

        return NextResponse.json({
            status: "SUCCESS",
            message: "User Registered Successfully!"
        });

    } catch (err) {
        return NextResponse.json({
            status: "FAILURE",
            message: err.message
        });
    }
}