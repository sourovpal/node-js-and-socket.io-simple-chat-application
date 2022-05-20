const db = require('../Helpers/db');
const hash = require('password-hash');
const moment = require('moment');
/**
 *
**/
module.exports.find = async(col, val)=>{
    return await findByUser(col, val);
}
/**
*
**/
module.exports.create = async(payload)=>{
    return await createUser(payload);      
}
/**** ============ Helpers Functions ============== ***/
/**** ============ Helpers Functions ============== ***/
/**** ============ Helpers Functions ============== ***/

/** * Check User Email * **/
const findByUser = async(col, val)=>{
    return await new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM tbl_users WHERE ${col}=? AND deleted_at IS NULL LIMIT 1`, [val], (error, result)=>{
            if(!error){
                return resolve(result.length?result[0]:{});
            }
            return reject(error);
        });
    });
}
/** * New User Create * **/
const createUser = async(payload)=>{
    return await new Promise((resolve, reject) =>{
        const currentTime = moment(Date.now()).format();
        const formData = {
            f_name:payload.fname,
            l_name:payload.lname,
            email:payload.email,
            password:hash.generate(payload.password),
            created_at: currentTime,
            updated_at: currentTime,
        };
        db.query("INSERT INTO tbl_users SET ?", formData, async(error)=>{
            if(error){
                return reject(error);
            }
            const user = await findByUser('email', payload.email);
            delete user.password;
            return resolve(user);
        });
    });
}