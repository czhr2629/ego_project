const mysql = require('mysql')
const MyObject = {
    host:"localhost",
    user:"root",
    password:"",
    database:"ego"
}

const client = mysql.createConnection(MyObject);
// 定义SQLConnect函数  对数据库进行操作
function SQLConnect(sql,arr,callback){
    client.query(sql,arr,(error,result)=>{
        if(error){
            console.log(error)
            return;
        }
        callback(result)
    })
}
module.exports = SQLConnect