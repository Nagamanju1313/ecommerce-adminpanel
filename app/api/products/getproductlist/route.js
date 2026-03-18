import { NextResponse } from "next/server";
import pool from '../../../lib/db'
import {isEmptyArray, isEmptyVariable} from '../../../util/util_functions';
import checkUser from "../../api_utils/user/checkuser";
import userAuth from "../../api_utils/userAuthentication";

export async function POST(req) {
    try{
        const { user_id, email_id } = await userAuth(req.cookies.get('token')?.value);

        let user = await checkUser(user_id);

        let [products] = await pool.query(`SELECT * FROM products p
            LEFT JOIN product_types pt
            ON p.product_id = pt.product_id
            LEFT JOIN product_categories pc
            ON p.category_id = pc.category_id
            WHERE 
            p.created_by = ${user_id}`);
        
        return NextResponse.json({
            status:"SUCCESS",
            data:products,
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