import { NextResponse } from "next/server";
import pool from '../../lib/db';
import bcrypt from "bcrypt";
import {isEmptyArray} from '../../util/util_functions'
export async function POST(req) {
    try{
        const {email_id, password} = await req.json();
        let [userId] = await pool.query(`SELECT * FROM users WHERE email_id= '${email_id}'`);
        if(isEmptyArray(userId)){
            throw new Error("User does not exists")
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(`UPDATE users password_hash = '${hashedPassword}' WHERE 
            user_id = '${userId?.[0]?.user_id}'
            `)
        let updatedPass = await pool.query(`UPDATE users SET password_hash = '${hashedPassword}' WHERE 
            user_id = ${userId?.[0]?.user_id}`);
        
        let response = NextResponse.json({
            status:"SUCCESS",
            message:"Password Updated successfully!!"
        })
        response.cookies.set("token","",
            {
                expires: new Date(0),
                path: "/"
            }
        )
        return response;
    }catch(error){
        return NextResponse.json({
            status:"FAILURE",
            message:error.message
        })
    }
} 