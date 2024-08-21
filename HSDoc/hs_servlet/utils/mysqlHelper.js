
let mysql = require('mysql')
let modelHelper = require('./modelHelper')
// let mysqlConfig = {
//     host   : 'localhost',
//     user   : 'root',
//     password : 'zhgd123',
//     port: '3306',
//     database: 'hs_doc',
//     timezone:'utc',
//     multipleStatements:true
// }
let mysqlConfig = {
    host   : '192.168.0.110',
    user   : 'root',
    password : '1202',
    port: '3306',
    database: 'data',
    timezone:'utc',
    multipleStatements:true
}
module.exports = {
    query(sql,para){
        let connection = mysql.createConnection(mysqlConfig);
        return new Promise((reslove,reject)=>{
            connection.query(sql,para,function(err,result){
                let resModel = modelHelper.resModel();
                if(err){
                    console.log(err);
                    resModel.success = false;
                    resModel.code = -1;
                    resModel.msg = err.sqlMessage;
                }else{
                    resModel.success = true;
                    resModel.code = 1;
                    resModel.data = JSON.parse(JSON.stringify(result))
                }
                connection.end();
                reslove(resModel)
            })
        }).catch((err)=>{
            console.log('err',err);
            connection.end();
        })

    }

}