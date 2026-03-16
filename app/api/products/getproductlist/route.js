import { NextResponse } from "next/server";
import pool from '../../../lib/db'
import {isEmptyArray, isEmptyVariable} from '../../../util/util_functions';

export async function POST(req) {
    try{
        let {user_id} = await req.json();
        
        if(isEmptyVariable(user_id)){
            throw new Error("User Id must be supplied")
        }
        
        let [user] = await pool.query(`SELECT * FROM users WHERE user_id = ${user_id}`);
        
        if(isEmptyArray(user)){
            throw new Error("User does not exists")
        }

        let [products] = await pool.query(`SELECT * FROM products WHERE created_by = ${user[0].user_id}`)
        
        return NextResponse.json({
            status:"SUCCESS",
            data:[products],
            message:"Data Retrieved Successfully!"
        })
    }catch(error){
        return NextResponse.json({
            status:"FAILURE",
            data:[],
            message:error.message
        })
    }
}