import { NextResponse } from "next/server";
import userAuth from "../../api_utils/userAuthentication";
import { isEmptyVariable } from "../../../util/util_functions";

export async function POST(req){
    try{
        const {user_id:superUserId, organization_id} = await userAuth(req.cookies.get('token')?.value);

        const {user_id } = await req.json();

        if(isEmptyVariable(user_id)){
            throw new Error("User id must be supplied")
        }
        //access check
        return NextResponse.json({
            status:"SUCCESS",
            data:[],
            message:"DATA retrieved successfully"
        })
    }catch(err){
        return NextResponse.json({
            status:"FAILURE",
            data:[],
            message:err.message
        })
    }
}