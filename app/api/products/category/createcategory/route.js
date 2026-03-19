import { NextResponse } from "next/server";
import { isEmptyVariable } from "../../../../util/util_functions";
import { checkDuplicate } from "../../../api_utils/checkduplicate";
import checkUser from "../../../api_utils/user/checkuser";
import userAuth from "../../../api_utils/userAuthentication";

export async function POST(req) {
    try {
        const {user_id, email_id} = await userAuth(req.cookies.get('token')?.value);

        let { category_name } = await req.json();
        
        let [user] = await checkUser(user_id);
        
        if (isEmptyVariable(category_name)) {
            throw new Error("category_name must be supplied")
        }

        await checkDuplicate('category_name', category_name, 'product_categories', ` AND
           created_by = ${user_id}
            `)

        let insertedData = await pool.query(`INSERT INTO product_categories (category_name, created_by, organization_id)
            VALUES (${category_name}, ${user_id}, ${user[0]?.organization_id})`);

        return NextResponse.json({
            status: "SUCCESS",
            data: insertedData,
            message: "Data inserted successfully"
        })
    } catch (err) {
        return NextResponse.json({
            status: "FAILURE",
            data: [],
            message: err.message
        })
    }
}