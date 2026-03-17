import { NextResponse } from "next/server";
import pool from '../../../lib/db'
import {isEmptyArray, isEmptyVariable} from '../../../util/util_functions';
import checkUser from "../../api_utils/user/checkuser";

export async function POST(req) {
    try{
        let {user_id} = await req.json();
        
        let user = await checkUser(user_id);

        let [products] = await pool.query(`SELECT * FROM products WHERE 
            created_by = ${user[0].user_id}`);
        
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