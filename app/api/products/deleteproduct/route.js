import { NextRequest } from "next/server";
import userAuth from "../../api_utils/userAuthentication";

export async function POST(req) {
    try {
        const { user_id, email_id } = await userAuth(req.cookies.get('token')?.value);

        let { product_id } = await req.json();
        
        let [user] = await checkUser(user_id);

        let [availablityCheck] = await pool.query(`SLEECT * FROM products WHERE product_id =${product_id}
            AND created_by = ${user_id}
            `);

        if (isEmptyArray(availablityCheck)) {
            throw new Error('Product does not exists')
        }

        let [productType] = await pool.query(`SLEECT * FROM product_types WHERE product_id =${product_id}
            AND created_by = ${user_id}
            `);

        if (!isEmptyArray(productType)) {
            await pool.query(`DELETE FROM product_types WHERE product_id =${product_id}
            AND created_by = ${user_id}`);
        }

        await pool.query(`DELETE FROM products WHERE product_id =${product_id}
            AND created_by = ${user_id}`);

        return NextRequest.json({
            status: "SUCCESS",
            data: [],
            message: "Data retriewed successfully!"
        })

    } catch (error) {
        return NextRequest.json({
            status: "FAILURE",
            data: [],
            message: "Data retriewed successfully!"
        })
    }
}