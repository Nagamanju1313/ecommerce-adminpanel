import { NextResponse } from "next/server";
import userAuth from "../api_utils/userAuthentication";
import pool from "../../lib/db";

export async function GET(req) {
    try {
        let { user_id, organization_id } = await userAuth(req.cookies.get('token')?.value);
        console.log(organization_id)
        //Total users, total categories, total products, total orders
        let [userDetails] = await pool.query(`SELECT first_name, last_name, email_id FROM users WHERE user_id = ${user_id}`);

        let [usersCount] = await pool.query(`SELECT COUNT(user_id) AS userCount from users WHERE 
            organization_id = ${organization_id} AND created_by = ${user_id}`);

        let [catCount] = await pool.query(`SELECT COUNT(category_id) AS categoriesCount
            FROM product_categories 
            WHERE organization_id = ${organization_id}`)

        let [prodCount] = await pool.query(`SELECT COUNT(product_id)  AS productsCount
            FROM products 
            WHERE organization_id = ${organization_id}`)

        let res = [userDetails, usersCount, catCount, prodCount]

        return NextResponse.json({
            status: "SUCCESS",
            data: res,
            message: "Data retrieved successfully"
        })
    } catch (err) {
        return NextResponse.json({
            status: "FAILURE",
            data: [],
            message: err.message
        })
    }
}