import { NextResponse } from "next/server";
import userAuth from "../../../api_utils/userAuthentication";
import pool from "../../../../lib/db";
import validateCatId from "../../../api_utils/product/validatecategory";

export async function POST(){
    try{
        const {user_id, email_id} = await userAuth(req.cookies.get('token')?.value);

        let {category_name, category_id} = await req.json();

        await validateCatId(category_id, user_id);

        let res = await pool.query(`UPDATE product_categories SET category_name = '${category_name}'
            WHERE created_by = ${user_id}
            `);

        return NextResponse.json({
            status:"SUCCESS",
            data:[],
            message:"Data retrieved successfully"
        })
    }catch(err){
        return NextResponse.json({
            status:"FAILURE",
            data:[],
            message:err.message
        })
    }
}