import pool from "../../lib/db";
import { isEmptyArray, isEmptyVariable } from "../../util/util_functions";
export const checkDuplicate = async (columnName, columnValue, tableName, condition) => {
    let sql = `SELECT * FROM ${tableName} WHERE ${columnName} = '${columnValue}'`;
    if (!isEmptyVariable(condition)) {
        sql += condition
    }
    let [res] = await pool.query(sql)
    if (!isEmptyArray(res)) {
        throw new Error(`${columnName} already exists`)
    }
}