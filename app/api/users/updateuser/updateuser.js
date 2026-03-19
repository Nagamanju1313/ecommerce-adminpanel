import { NextRequest } from "next/server";
import userAuth from "../../api_utils/userAuthentication";
import { isEmptyVariable } from "../../../util/util_functions";

export async function POST(req){
    try{
        const {user_id:superUserId, organization_id} = await userAuth(req.cookies.get('token')?.value);

        const {user_id, first_name, last_name, email_id, password, user_type } = await req.json();
        
        if(isEmptyVariable(user_id)){
            throw new Error("User ID must be supplied")
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        
        await checkDuplicate('email_id', email_id, 'users', ` AND organization_id = ${organization_id}`);

        let sql = `UPDATE users SET `

        if(!isEmptyVariable(first_name)){
            sql += `first_name = ${first_name}`
        }
        if(!isEmptyVariable(last_name)){
            sql += `last_name = ${last_name}`
        }
        if(!isEmptyVariable(email_id)){
            sql += `last_name = ${email_id}`
        }
        if(!isEmptyVariable(password)){
            sql += `password_hash = ${hashedPassword}`
        }
        if(!isEmptyVariable(user_type)){
            sql += `user_type = ${"ADMIN"}`
        }
        sql+= ` WHERE user_id = ${user_id}`

        let res = await pool.query(sql);

        return NextRequest.json({
            status:"SUCCESS",
            data:res,
            message:"Data retrieved successfully"
        })
    }catch(error){
        return NextRequest.json({
            status:"FAILURE",
            data:[],
            message:error.message
        })
    }
}