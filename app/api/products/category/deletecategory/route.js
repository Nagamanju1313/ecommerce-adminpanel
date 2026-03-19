import { NextResponse } from "next/server";
import validateCatId from "../../../api_utils/product/validatecategory";
import userAuth from "../../../api_utils/userAuthentication";

export async function POST(req){
    try{
        const {user_id, email_id} = await userAuth(req.cookies.get('token')?.value);

        const {category_id} = await req.json();

        await validateCatId(category_id);

        await pool.query(`DELETE FROM product_category WHERE category_id = ${category_id}
            AND created_by = ${user_id}`);

        return NextResponse({
            status:"SUCCESS",
            data:[],
            message:"Data retrieved successfully"
        })
    }catch(err){
        return NextResponse.json({
            status:"FAILURE",
            data:[],
            message:"Data not found"
        })
    }
}