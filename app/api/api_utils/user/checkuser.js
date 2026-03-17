import pool from "../../../lib/db";
import { isEmptyArray, isEmptyVariable } from "../../../util/util_functions";

const checkUser = async (userId) => {
    if (isEmptyVariable(userId)) {
        throw new Error("User Id must be supplied")
    }
    let [user] = await pool.query(`SELECT * FROM users WHERE user_id = ${userId}`);
    
    if (isEmptyArray(user)) {
        throw new Error("User does not exists")
    }
    return user;
}
export default checkUser;