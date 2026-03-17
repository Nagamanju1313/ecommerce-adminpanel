import pool from "../../../lib/db";
import { isEmptyArray, isEmptyVariable } from "../../../util/util_functions";
const validateCatId = async (catId, userId) =>{
    let [data] = await pool.query(`SELECT * FROM product_categories WHERE category_id = ${catId}
        AND created_by = ${userId}
        `);
    if(isEmptyArray(data)){
        throw new Error("Category doesnot exists");
    }
    return data;
}
export default validateCatId;