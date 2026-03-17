// import { NextResponse } from "next/server";
// import checkUser from "../../api_utils/user/checkuser";
// import validateCatId from "../../api_utils/product/validatecategory";
// import { checkDuplicate } from "../../api_utils/checkduplicate";
// import { isEmptyArray, isEmptyVariable } from "../../../util/util_functions";
// import pool from "../../../lib/db";

// export async function PUT(req) {
//     try {
//         let { user_id, product_name, description,
//             images, stock_quantity, category_id,
//             price, selling_price, product_variants, category_name
//         } = await req.json();

//         let user = await checkUser(user_id);

//         let cat;
//         if (!isEmptyVariable(category_id)) {
//             cat = await validateCatId(category_id);
//             if (isEmptyArray(cat)) {
//                 throw new Error("Category doesnot exists")
//             }
//             cat = cat[0]
//         }

//         let category;
//         if (!isEmptyVariable(category_name)) {
//             category = await checkDuplicate(category_name, category_name, 'product_categories', ` AND
//              organization_id = ${user[0]?.organization_id}`);
//             if (!isEmptyArray(category)) {
//                 throw new Error("Category already exists")
//             }
//             category = category[0]
//         }

//         let categoryName;
//         if (!isEmptyVariable(category_name)) {
//             categoryName = await pool.query(`INSERT INTO product_categories (category_name, created_by,
//                 organization_id)
//                 VALUES ('${categoryName}',  '${user[0].user_id}', '${user[0].organization_id}')`)
//         }

//         let product;
//         if (!isEmptyVariable(product_name)) {
//             product = pool.query(`SELECT * FROM products WHERE product_name = '${product_name}'
//                 AND organization_id = ${user[0]?.organization_id} AND category_id = ${category_id}
//             `);
//             if (!isEmptyArray(product)) {
//                 throw new Error("Product name already exists")
//             }
//             product = product[0]
//         }

//         if (!isEmptyArray(product)) {
//             throw new Error("Product Name already exists")
//         }

//         let [insertProduct] = await pool.query(`INSERT INTO products 
//             (product_name,description, images, stock_quantity, category_id, organization_id, created_by, price, selling_price)
//             VALUES
//             ('${product_name}', '${description}', '${images}', '${stock_quantity}', '${category_id}', '${user[0].organization_id}',
//             '${user[0]?.user_id}', '${price}', '${selling_price}')
//             `);

//         let res;
//         if (!isEmptyVariable(product_variants)) {
//             res = await pool.query(`INSERT INTO product_types (type_names, product_id, created_by, organization_id) 
//                 VALUES ('${product_variants}', ${insertProduct.insertId}, ${user[0]?.user_id}, ${user[0].organization_id})`)
//         };

//         return NextResponse({
//             status: "SUCCESS",
//             message: "Product Created Successfully",
//             data: []
//         })

//     } catch (error) {
//         return NextResponse.json({
//             status: "FAILURE",
//             message: error.message,
//             data: []
//         })
//     }
// }