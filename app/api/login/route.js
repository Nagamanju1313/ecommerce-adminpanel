import { NextResponse } from "next/server";
import {isEmptyArray, isEmptyVariable} from '../../util/util_functions';
import bcrypt from "bcrypt";
import pool from "../../lib/db";
import jwt from "jsonwebtoken";

export async function POST(req){
    try{
        const {email_id, password} = await req.json();

        if(isEmptyVariable(email_id)){
            throw new Error("Email Id must be supplied!")
        }
        if(isEmptyVariable(password)){
            throw new Error("Password must be supplied!")
        }
        let [user] = await pool.query(`SELECT * FROM users WHERE email_id='${email_id}'`);
        
        if(isEmptyArray(user)){
            throw new Error("User Does Not Exixts")
        }
        
        let decryptedPassword = await bcrypt.compare(password, user[0]?.password_hash);
        
        if(!decryptedPassword){
            throw new Error("Password doesn't match in any record!")
        };

        const token =jwt.sign(
            {
                id:user[0]?.user_id, email:user[0]?.email_id
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        let result = NextResponse.json({
            status:"SUCCESS",
            message:"Login Successful!"
        })

        result.cookies.set("token",token, {
            httpOnly: true,
            secure: true,
            path: "/"
        });
        
        return result;
    }catch(error){
        return NextResponse.json({
            status:"FAILURE",
            message:error.message
        })
    }
}