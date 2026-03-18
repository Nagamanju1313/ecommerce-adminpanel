import { NextResponse } from "next/server";
import checkUser from "../../api_utils/user/checkuser";
import validateCatId from "../../api_utils/product/validatecategory";
import { checkDuplicate } from "../../api_utils/checkduplicate";
import { isEmptyArray, isEmptyVariable } from "../../../util/util_functions";
import pool from "../../../lib/db";
import userAuth from "../../api_utils/userAuthentication";

export async function POST(req) {
    try {
        const userData = await userAuth(req.cokkies.get('token').value);

        let { product_name, description,
            images, stock_quantity, category_id,
            price, selling_price, product_variants, product_id
        } = await req.json();

        let user = await checkUser(user_id);

        let cat;
        if (!isEmptyVariable(category_id)) {
            cat = await validateCatId(category_id);
        }

        let sql = `UPDATE products SET `
        if (!isEmptyVariable(product_name)) {
            sql += `product_name = ${product_name}`
        }

        if (!isEmptyVariable(description)) {
            sql += `description = ${description}`
        }

        if (!isEmptyVariable(stock_quantity)) {
            sql += `stock_quantity = ${stock_quantity}`
        }

        if (!isEmptyVariable(images)) {
            sql += `images = ${images}`
        }
        if (!isEmptyVariable(category_id)) {
            sql += `category_id = ${cat[0].category_id}`
        }
        if (!isEmptyVariable(price)) {
            sql += `price = ${price}`
        }
        if (!isEmptyVariable(selling_price)) {
            sql += `selling_price = ${selling_price}`
        }
        sql += ` WHERE product_id = ${product_id} and created_by = ${user_id}`

        let [update] = await pool.query(sql);

        if (!isEmptyVariable(product_variants)) {
            let [res] = await pool.query(`UPDATE product_types SET type_names='${product_variants}'
                WHERE product_id = ${product_id}
                `)

        }
        return NextResponse({
            status: "SUCCESS",
            message: "Product Updated Successfully",
            data: []
        })

    } catch (error) {
        return NextResponse.json({
            status: "FAILURE",
            message: error.message,
            data: []
        })
    }
}