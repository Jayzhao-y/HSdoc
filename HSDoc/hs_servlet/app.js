const express = require("express");
const bodyParser = require('body-parser');
const config = require('./config')
const mysqlHelper = require('./utils/mysqlHelper')
const app = express();

config(app)
 
app.get("/",(req, res)=>{
    res.send("hello");
})

//unit 单位
app.post('/unit/insert',(request, response)=>{
    let sql = `INSERT INTO unitengineer (unit_name,unit_startpile,unit_endpile) VALUE (?,?,?);`;
    let param = request.body;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '新增失败';
            response.json(res);
            return;
        }else{
            res.msg = '新增成功';
            response.json(res);
        }
    })
})
app.post('/unit/getList',(request, response)=>{
    // let sql = `INSERT INTO unitengineer (unit_name,unit_startpile,unit_endpile) VALUE (?,?,?);`;
    let sql = `SELECT * FROM  unitengineer`;
    let param = request.body;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '查询失败';
            response.json(res);
            return;
        }else{
            res.msg = '查询成功';
            response.json(res);
        }
    })
})
app.post('/unit/deleteList',(request, response)=>{
    // let sql = `INSERT INTO unitengineer (unit_name,unit_startpile,unit_endpile) VALUE (?,?,?);`;
    let sql = `DELETE FROM unitengineer WHERE unit_id IN (?);`;
    let param = [request.body];
    
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '删除失败';
            response.json(res);
            return;
        }else{
            res.msg = '删除成功';
            response.json(res);
        }
    })
})
//branch  分部
app.post('/branch/insert',(request, response)=>{
    let arr = request.body;
    const param = arr.map(branch => `('${branch.branch_startpile}', '${branch.branch_endpile}', '${branch.unitengineer_unit_id}', '${branch.branch_name}')`).join(', ');
    // const param = arr.map(branch => `(${branch.branch_startpile}, '${branch.branch_endpile}', '${branch.unitengineer_unit_id}', '${branch.branch_name}')`).join(', ');
    let sql = `INSERT INTO branchengineer (branch_startpile,branch_endpile,unitengineer_unit_id,branch_name) VALUE ${param};`;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '新增失败';
            response.json(res);
            return;
        }else{
            res.msg = '新增成功';
            response.json(res);
        }
    })
})
app.post('/branch/getList',(request, response)=>{
    let sql = `
           CREATE TEMPORARY TABLE temp_branch AS
            SELECT  *
                FROM 
                (SELECT branch_id,branch_name, ROW_NUMBER() OVER (PARTITION BY branch_name ORDER BY branch_id) AS category_rank
                FROM branchengineer) AS subquery;
            SELECT 
                branchengineer.branch_id,
                CONCAT(branchengineer.branch_startpile,'-',branchengineer.branch_endpile) AS branch_concat,
                branchengineer.unitengineer_unit_id,
                CONCAT(branchtype.branchtype_name,temp_branch.category_rank) AS branchtype_name,
                unitengineer.unit_id,
                unitengineer.unit_name,
                CONCAT(unitengineer.unit_startpile,'-',unitengineer.unit_endpile) AS unit_concat
            FROM 
                branchengineer
            JOIN 
                branchtype ON branchengineer.branch_name = branchtype.branchtype_id
            JOIN 
                temp_branch ON branchengineer.branch_id = temp_branch.branch_id
            JOIN 
                unitengineer ON branchengineer.unitengineer_unit_id = unitengineer.unit_id
            ORDER BY branch_id ASC;`;
    let param = request.body;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '查询失败';
            response.json(res);
            return;
        }else{
            res.msg = '查询成功';
            response.json(res);
        }
    })
})
app.post('/branch/deleteList',(request, response)=>{
    let sql = `DELETE FROM branchengineer WHERE branch_id IN (?);`;
    let param = [request.body];
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '删除失败';
            response.json(res);
            return;
        }else{
            res.msg = '删除成功';
            response.json(res);
        }
    })
})
app.post('/branch/getBranchType',(request, response)=>{
    let sql = `SELECT * FROM branchtype`;
    let param = request.body;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '查询失败';
            response.json(res);
            return;
        }else{
            res.msg = '查询成功';
            response.json(res);
        }
    })
})
//module  单元
app.post('/module/insert',(request, response)=>{
    let arr = request.body;
    const param = arr.map(module => `('${module.module_process}', '${module.branchengineer_branch_id}', '${module.module_name}', '${module.modulesegment_segment_id}', '${module.module_start}', '${module.module_end}', '${module.construct_code}')`).join(', ');
    let sql = `INSERT INTO moduleengineer (module_process,branchengineer_branch_id,module_name,modulesegment_segment_id,module_start,module_end,construct_code)
                VALUES  ${param}`;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '新增失败';
            response.json(res);
            return;
        }else{
            res.msg = '新增成功';
            response.json(res);
        }
    })
})
app.post('/module/getFreq',(request, response)=>{
    let sql = `SELECT * FROM  modulesegment`;
    let param = request.body;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '查询失败';
            response.json(res);
            return;
        }else{
            res.msg = '查询成功';
            response.json(res);
        }
    })
})
app.post('/module/getList',(request, response)=>{
    let sql = `CREATE TEMPORARY TABLE temp_module AS
            SELECT 
                branchengineer.branch_id AS id,
                CONCAT(branchengineer.branch_startpile,'-',branchengineer.branch_endpile) AS branch_concat,
                branchtype.branchtype_name,
                unitengineer.unit_id,
                unitengineer.unit_name,
                CONCAT(unitengineer.unit_startpile,'-',unitengineer.unit_endpile) AS unit_concat
            FROM branchengineer
            JOIN branchtype ON branchengineer.branch_name = branchtype.branchtype_id
            JOIN unitengineer ON branchengineer.unitengineer_unit_id = unitengineer.unit_id;
            SELECT 
                module_id,
                branch_concat,
                branchtype_name,
                unit_name,
                unit_concat,
                moduletype.moduletype_name AS module_name,
                process_name AS module_process,
                CONCAT(moduleengineer.module_start,'-',moduleengineer.module_end) AS module_concat,
                module_code,
                construct_code,
                construct_date,
                finish_date,
                reply_date,
                quantities,
                da_ratio
            FROM moduleengineer
            JOIN moduletype ON moduletype.moduletype_id = moduleengineer.module_name
            JOIN temp_module ON moduleengineer.branchengineer_branch_id = temp_module.id
            JOIN processtype ON processtype.process_id = moduleengineer.module_process
            JOIN modulesegment ON moduleengineer.modulesegment_segment_id = modulesegment.segment_id
            JOIN branchengineer ON moduleengineer.branchengineer_branch_id = branchengineer.branch_id;`;
    let param = request.body;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '查询失败';
            response.json(res);
            return;
        }else{
            res.msg = '查询成功';
            response.json(res);
        }
    })
})
app.post('/module/updateList',(request, response)=>{
    let sql = `UPDATE moduleengineer SET ? WHERE module_id = ?;`;
    let param = request.body;
    console.log('keys',param[0]);
    const keys = Object.keys(param[0]);
    
    
    // 删除前五个元素的键
    keys.splice(0, 9);
    console.log(keys);
    // 创建一个新的对象，只包含剩余的键值对
    const newObj = {};
    
    
    keys.forEach(key => {
      newObj[key] = param[0][key];
    });
    let newParam = [newObj,param[1]]
 
    
    mysqlHelper.query(sql,newParam).then(res=>{
        if(!res.success){
            res.msg = '修改失败';
            response.json(res);
            return;
        }else{
            res.msg = '修改成功';
            response.json(res);
        }
    })
})
app.post('/module/deleteList',(request, response)=>{
    let sql = `DELETE FROM moduleengineer WHERE module_id IN (?);`;
    let param = [request.body];
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '删除失败';
            response.json(res);
            return;
        }else{
            res.msg = '删除成功';
            response.json(res);
        }
    })
})

app.post('/module/getProcessNum',(request, response)=>{
    const param = request.body
    let sql = `SELECT GROUP_CONCAT(process_id) AS ids FROM moduletype_process_relation
                JOIN processtype ON processtype.process_id = moduletype_process_relation.processtype_id
                WHERE moduletype_process_relation.moduletype_id = ?;`;
    mysqlHelper.query(sql,param.process_id).then(res=>{
        if(!res.success){
            res.msg = '查询失败';
            response.json(res);
            return;
        }else{
            res.msg = '查询成功';
            response.json(res);
        }
    })
})

//moduleType  类型管理
app.post('/moduleType/insert',(request, response)=>{
    let arr = request.body; 
    const param = arr;
    let sql = `INSERT INTO moduletype (moduletype_name,modulesegment_id) VALUES (?,?)`;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '新增失败';
            response.json(res);
            return;
        }else{
            res.msg = '新增成功';
            response.json(res);
        }
    })
})
app.post('/moduleProcessRelation/insert',(request, response)=>{
    let arr = request.body; 
    const param = arr;
    let sql = `INSERT INTO moduletype_process_relation (moduletype_id,processtype_id) VALUES (?,?)`;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '新增失败';
            response.json(res);
            return;
        }else{
            res.msg = '新增成功';
            response.json(res);
        }
    })
})
app.post('/moduleType/getList',(request, response)=>{
    let sql = `SELECT 
    moduletype_name,
    modulesegment.segment_content,
		modulesegment.segment_id,
        (SELECT GROUP_CONCAT(process_name SEPARATOR ', ') 
        FROM moduletype_process_relation 
        JOIN processtype ON processtype.process_id = moduletype_process_relation.processtype_id 
        WHERE moduletype_process_relation.moduletype_id = moduletype.moduletype_id) AS process_names,
		(SELECT GROUP_CONCAT(process_id SEPARATOR ', ')
        FROM moduletype_process_relation 
        JOIN processtype ON processtype.process_id = moduletype_process_relation.processtype_id 
        WHERE moduletype_process_relation.moduletype_id = moduletype.moduletype_id) AS process_ids
        FROM moduletype
        JOIN modulesegment ON modulesegment.segment_id = moduletype.modulesegment_id;`
    let param = request.body;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '查询失败';
            response.json(res);
            return;
        }else{
            res.msg = '查询成功';
            response.json(res);
        }
    })
})
app.post('/moduleType/getModuleType',(request, response)=>{
    let arr = request.body; 
    const param = arr;
    let sql = `SELECT * FROM moduletype`;
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '新增失败';
            response.json(res);
            return;
        }else{
            res.msg = '新增成功';
            response.json(res);
        }
    })
})
 

 
app.listen(8889, ()=>{
    console.log('Example app listening on port 8889!');
})