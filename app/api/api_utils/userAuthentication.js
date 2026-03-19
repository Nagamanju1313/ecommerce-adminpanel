import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const userAuth = async (token)=>{
    if (!token) {
        return NextResponse.json({
            status: "FAILURE",
            message: 'User does not exists'
        })
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}
export default userAuth;