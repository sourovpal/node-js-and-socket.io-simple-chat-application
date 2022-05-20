const db = require('../Helpers/db');
const moment = require('moment');

module.exports.status = async(id, status)=>{
    return new Promise((resolve, reject)=>{
        const currentTime = moment(Date.now()).format();
        db.query('UPDATE tbl_users SET status=?, updated_at=? WHERE id=?', [status, currentTime, id], (error, result)=>{
            if(!error){
                return resolve(result);
            }
            return reject(error);
        });
    });
}

module.exports.get = async(id)=>{
    return await new Promise(async(resolve, reject)=>{
        const query = `SELECT tbl_users.*, CONCAT(tbl_users.f_name, ' ', tbl_users.l_name) as name, SUM(tbl_notify.seen) as total_notifications 
        FROM tbl_users, tbl_message_notifications as tbl_notify
            WHERE (tbl_notify.sender_id=tbl_users.id AND tbl_notify.receiver_id=${id})
            GROUP BY tbl_notify.sender_id`;
        //
        db.query(query, (error, users)=>{
            if(!error){
                return resolve(users);
            }
            return reject(error);
        });
    });
    // 
}

