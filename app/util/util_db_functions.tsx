import pool from '../lib/db';

export const checkDuplicate = async (tableName:string, condition:string)=>{
    let res = {};
    let sql = await pool.query(`SELECT * FROM ${tableName} WHERE ${condition}`);
    return res
}