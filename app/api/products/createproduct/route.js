import { NextResponse } from "next/server";
import checkUser from "../../api_utils/user/checkuser";
import validateCatId from "../../api_utils/product/validatecategory";
import { checkDuplicate } from "../../api_utils/checkduplicate";
import { isEmptyArray, isEmptyObject, isEmptyVariable } from "../../../util/util_functions";
import pool from "../../../lib/db";
import userAuth from "../../api_utils/userAuthentication";

export async function POST(req) {
    try {
        const {user_id, email_id} = await userAuth(req.cookies.get('token')?.value);
        
        let { product_name, description,
            images, stock_quantity, category_id,
            price, selling_price, product_variants, category_name
        } = await req.json();

        if (isEmptyVariable(product_name)) {
            throw new Error("Product name must be supplied!")
        }

        if (isEmptyArray(images)) {
            images = '[]'
        }

        let user = await checkUser(user_id);
        
        if (!isEmptyVariable(category_id) && !isEmptyVariable(category_name)) {
            throw new Error("Either Cat Id or Cat Name supplied!")
        }
        
        let catId;
        if (!isEmptyVariable(category_id)) {
            catId = await validateCatId(category_id, user_id);
            catId = catId[0]?.category_id
        }
        
        if (!isEmptyVariable(category_name)) {
            await checkDuplicate('category_name', category_name, 'product_categories', ` AND
                organization_id = ${user[0]?.organization_id}`);

            //Insert Category
            let [insCat] = await pool.query(`INSERT INTO product_categories (category_name,created_by, organization_id) 
                VALUES ('${category_name}', ${user[0]?.user_id},  ${user[0]?.organization_id})`);
            catId = insCat.insertId;
        }
        
        if (!isEmptyVariable(product_name)) {
            await checkDuplicate('product_name', product_name, 'products', ` AND
                organization_id = ${user[0]?.organization_id}`);
        }

        let [insertProduct] = await pool.query(`INSERT INTO products 
            (product_name,description, images, stock_quantity, category_id, organization_id, created_by, price, selling_price)
            VALUES
            ('${product_name}', '${description}', '${images}', ${stock_quantity}, ${catId || null}, ${user[0].organization_id},
            ${user[0]?.user_id}, ${price}, ${selling_price})
            `);
        
        if (isEmptyArray(product_variants)) {
            product_variants = '[]'
        }

        let typeInsert = await pool.query(`INSERT INTO product_types (type_names, product_id, created_by,
            organization_id)
            VALUES ('${product_variants}',${insertProduct.insertId}, ${user[0]?.user_id}, ${user[0]?.organization_id})`);

        return NextResponse.json({
            status: "SUCCESS",
            message: "Product Created Successfully",
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