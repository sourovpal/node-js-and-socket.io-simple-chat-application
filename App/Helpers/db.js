const mysql = require('mysql');
const { DB } = require('../../config');
const database = require('../../migrations/database');
const db = mysql.createConnection(DB);

db.connect((error) =>{
    if(!error){
        db.query(database.tbl_users, (error, result)=>{
            if(!error){
                console.log('tbl_users database created successful.');
            }
        });
        db.query(database.tbl_chats, (error, result)=>{
            if(!error){
                console.log('tbl_chats database created successful.');
            }
        });
    }else{
        console.log('DB Connection Failed.............');
    }
});

module.exports = db;