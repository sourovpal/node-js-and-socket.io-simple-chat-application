const db = require("../Helpers/db");
const moment = require('moment');


module.exports.getMessage = async(sender_id, receiver_id)=>{
    return await new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM tbl_chats WHERE 
        (sender_id =${sender_id} AND receiver_id=${receiver_id}) OR 
        (sender_id =${receiver_id} AND receiver_id=${sender_id}) ORDER BY created_at ASC`, (error, messages)=>{
            if(!error){
                return resolve(messages);
            }
            return reject(error);
        });
    });
};

module.exports.saveMessage = async({sender_id, receiver_id, message})=>{
    return await new Promise((resolve, reject)=>{
        const currentTime = moment(Date.now()).format();
        const formData = {
            sender_id,
            receiver_id,
            message,
            created_at:currentTime,
            updated_at:currentTime,
        }
        db.query(`INSERT INTO tbl_chats SET ?`, formData, (error, result)=>{
            if(!error){
                var insertId = result.insertId;
                var notify_1 = {
                    chat_id:insertId,
                    sender_id,
                    receiver_id,
                }
                var notify_2 = {
                    chat_id:insertId,
                    sender_id:receiver_id,
                    receiver_id:sender_id,
                    seen:0,
                }
                db.query("INSERT INTO tbl_message_notifications SET ?", notify_1, ()=>{});
                db.query("INSERT INTO tbl_message_notifications SET ?", notify_2, ()=>{});
                return resolve(formData);
            }
            return reject(error);
        });
    });
}