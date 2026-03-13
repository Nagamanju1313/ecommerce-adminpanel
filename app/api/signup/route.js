import { NextResponse } from "next/server";
import pool from "../../lib/db";
import { isEmptyArray, isEmptyVariable } from '../../util/util_functions'
import { checkDuplicate } from '../../util/util_db_functions'
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        let { first_name, last_name, organization_name, email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        
        if (isEmptyVariable(first_name || last_name || organization_name || email || password)) {
            throw new Error("Some of input values are not supplied!")
        };

        const [orgId] = await pool.query(`SELECT * FROM organization WHERE organization_name = '${organization_name}'
            AND email_id = '${email}' `);
        
        if(!isEmptyArray(orgId)){
            throw new Error("Email ID Or Organization already exists")
        }

        let userId = Math.floor((Math.random()*100000)+1)

        let [orgInsert] = await pool.query(`INSERT INTO organization (organization_name, email_id) 
            VALUES ('${organization_name}', '${email}')`);

        if(isEmptyArray(orgInsert)){
            throw new Error("organization Not inserted successfully")
        }

        let [userInsert] = await pool.query(`INSERT INTO users 
            (user_id, first_name, last_name, organization_id,
            user_type, email_id, password_hash, created_by)
            VALUES (${userId}, '${first_name}','${last_name}',
            ${orgInsert.insertId}, "ADMIN", '${email}', 
            '${hashedPassword}', ${userId})`);

        // // const match = await bcrypt.compare(password, db.user.password);
        
        if(isEmptyArray(userInsert)){
            throw new Error("User Not inserted successfully")
        }
        
        return NextResponse.json({
            status: "SUCCESS",
            data: {
                first_name:first_name,
                last_name:last_name,
                organization_name:organization_name,
                user_id:userId,
                email_id:email,
                password:password
            }
        });

    } catch (err) {
        return NextResponse.json({
            status: "FAILURE",
            data: err.message
        });
    }
}