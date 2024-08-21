const express = require("express");
const bodyParser = require('body-parser');
const config = require('./config')
const mysqlHelper = require('./utils/mysqlHelper')
const multer = require('multer')
const iconv = require('iconv-lite')
const docx = require('docx');
const path = require('path');
const fs = require('fs');
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
    let sql = `DELETE FROM unitengineer
                WHERE unit_id IN (?)
                AND NOT EXISTS (
                    SELECT 1 FROM branchengineer
                    WHERE branchengineer.unitengineer_unit_id = unitengineer.unit_id
                );`;
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
                (SELECT unitengineer_unit_id, branch_id, branch_name, ROW_NUMBER() OVER (PARTITION BY unitengineer_unit_id, branch_name ORDER BY branch_id) AS category_rank
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
            ORDER BY branchengineer.unitengineer_unit_id ASC,branchengineer.branch_name ASC;`;
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
    let sql = `DELETE FROM branchengineer
                WHERE branch_id IN (?)
                AND NOT EXISTS (
                    SELECT 1 FROM moduleengineer
                    WHERE branchengineer.branch_id = moduleengineer.branchengineer_branch_id
                );`;
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
    const param = arr.map(module => `('${module.process_relation_id}','${module.module_process}', '${module.branchengineer_branch_id}', '${module.module_name}', '${module.modulesegment_segment_id}', '${module.module_start}', '${module.module_end}', '${module.construct_code}')`).join(', ');
    let sql = `INSERT INTO moduleengineer (process_relation_id,module_process,branchengineer_branch_id,module_name,modulesegment_segment_id,module_start,module_end,construct_code)
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
let tempSql = `CREATE TEMPORARY TABLE temp_module AS
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
            CREATE TEMPORARY TABLE temp_branch AS
            SELECT  *
                FROM 
                (SELECT unitengineer_unit_id, branch_id, branch_name, ROW_NUMBER() OVER (PARTITION BY unitengineer_unit_id, branch_name ORDER BY branch_id) AS category_rank
                FROM branchengineer) AS subquery;
						CREATE TEMPORARY TABLE temp_process AS
            SELECT 
                module_id,
								unit_name,
								CONCAT(branchtype.branchtype_name,temp_branch.category_rank) AS branchtype_name,
                moduletype.moduletype_name AS module_name,
								process_name AS module_process,
                CONCAT(moduleengineer.module_start,'-',moduleengineer.module_end) AS module_concat,
								branch_concat,
								branchengineer.unitengineer_unit_id AS unit_id,
                unit_concat,
								moduleengineer.module_name AS module_name_id,
                module_code,
                construct_code,
                construct_date,
                finish_date,
                reply_date,
                quantities,
                da_ratio,
                branchengineer.branch_id,
				process_relation_id
            FROM moduleengineer
            JOIN moduletype ON moduletype.moduletype_id = moduleengineer.module_name
            JOIN temp_module ON moduleengineer.branchengineer_branch_id = temp_module.id
            JOIN processtype ON processtype.process_id = moduleengineer.module_process
            JOIN modulesegment ON moduleengineer.modulesegment_segment_id = modulesegment.segment_id
            JOIN branchengineer ON moduleengineer.branchengineer_branch_id = branchengineer.branch_id
            JOIN 
                branchtype ON branchengineer.branch_name = branchtype.branchtype_id
            JOIN 
                temp_branch ON branchengineer.branch_id = temp_branch.branch_id
						ORDER BY unit_id,branchengineer.branch_id,module_name,module_concat ASC,process_relation_id;`
app.post('/module/getList',(request, response)=>{
    let sql = tempSql +`SELECT * FROM temp_process`;
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

    const keys = param[0];
    
    let key={
        construct_date:keys.construct_date,
        finish_date:keys.finish_date,
        reply_date:keys.reply_date,
        quantities:keys.quantities,
        da_ratio:keys.da_ratio
    }
    

    let newParam = [key,param[1]]
    
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

//moduleType  单元类型管理
app.post('/moduleType/insert',(request, response)=>{
    let arr = request.body; 
    let param =[arr.moduletype_name,arr.modulesegment_id];
   
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
app.post('/moduleType/deleteList',(request, response)=>{
    let sql = `DELETE FROM moduletype
                WHERE moduletype_id IN (?)
                AND NOT EXISTS (
                    SELECT 1 FROM moduleengineer
                    WHERE moduletype.moduletype_id = moduleengineer.module_name
                );`;
    let param = [request.body];
    mysqlHelper.query(sql,param).then(res=>{
        if(!res.success){
            res.msg = '删除失败';
            response.json(res);
            return;
        }else{
            res.msg = '删除成功';
            response.json(res);
            if(res.data.affectedRows>0){
                sql = `DELETE FROM moduletype_process_relation WHERE moduletype_id IN (?)`;
                mysqlHelper.query(sql,param).then(res=>{ })
            }
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
		(SELECT CONCAT('[', GROUP_CONCAT(process_id SEPARATOR ', '), ']') AS result
        FROM moduletype_process_relation 
        JOIN processtype ON processtype.process_id = moduletype_process_relation.processtype_id 
        WHERE moduletype_process_relation.moduletype_id = moduletype.moduletype_id) AS process_ids,
        moduletype_id
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
app.post('/moduleType/getProcessList',(request, response)=>{
    let sql = `SELECT * FROM  processtype`;
    mysqlHelper.query(sql,).then(res=>{
        if(!res.success){
            res.msg = '查询失败'
            response.json(res);
            return;
        }else{
            res.msg = '查询成功';
            response.json(res);
        }
    })
})
app.post('/moduleType/update',(request, response)=>{
    let sql = `UPDATE moduletype SET ? WHERE moduletype_id = ?;`;
    let param = request.body;
    let setArr =[{
        moduletype_name:param[0].moduletype_name,
        modulesegment_id:param[0].segment_id
    },param[1]]
    mysqlHelper.query(sql,setArr).then(res=>{
        if(!res.success){
           
            return;
        }else{
           let arr = param[0].process_ids
            let temp = arr.map(processtype_id => `('${param[0].moduletype_id}', '${processtype_id}')`).join(', ');
            let sql2=`DELETE FROM moduletype_process_relation WHERE moduletype_id = ?;
                    INSERT INTO moduletype_process_relation (moduletype_id,processtype_id) VALUE ${temp?temp:0};`
            let param2 = param[0].moduletype_id
            mysqlHelper.query(sql2,param2).then(res=>{
                if(!res.success){
                    res.msg = '修改失败';
                    response.json(res);
                    return;
                }else{
                    res.msg = '修改成功';
                    response.json(res);
                }
            })

        }
    })
})

const storage = multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'tempFile/');
    },
    filename:(req,file,cd)=>{
        cd(null,iconv.decode(file.originalname,'utf-8'))
    }
})
const uploader = multer({storage:storage})
app.post('/moduleType/uploadSheet',uploader.single('file'),(request, response)=>{

    let id =request.body.moduletype_id
    let fileName = request.file.filename
let buffer = Buffer.from(request.file.filename, 'utf8');
let decodedStr = iconv.decode(buffer, 'utf8');
    // 获取当前文件所在目录的绝对路径
  const currentDir = path.resolve(__dirname);
  // 拼接路径，生成兄弟文件夹的绝对路径
  const siblingDir = path.join(currentDir, 'tempFile');
    
    let param = [fileName,id,siblingDir]
    let sql = `
    DELETE  FROM mould WHERE mould_name = '${fileName}' AND moduletype_id = ${id};
    INSERT INTO mould (mould_name,moduletype_id,mould_path) VALUES (?,?,?)`;
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
app.post('/moduleType/getSheetList',(request, response)=>{
    let sql = `SELECT * FROM mould
                WHERE moduletype_id = ?`
    let param = request.body.sheet_id;
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
app.post('/moduleType/deleteSheetList',(request, response)=>{
    let sql = `DELETE FROM mould
                WHERE mould_id = ?`
    let param = request.body.sheet_id;
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




//branchType    分部类型管理
app.post('/branchType/insert',(request, response)=>{
    let arr = request.body; 
    let param =arr.branchtype_name;
   
    let sql = `INSERT INTO branchtype (branchtype_name) VALUES (?)`;
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
app.post('/branchType/getList',(request, response)=>{
    let sql = `SELECT * FROM branchtype;`
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
app.post('/branchType/deleteList',(request, response)=>{
    let sql = `DELETE FROM branchtype
                WHERE branchtype_id IN (?)
                AND NOT EXISTS (
                    SELECT 1 FROM branchengineer
                    WHERE branchengineer.branch_name = branchtype.branchtype_id
                );`;
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


//statistical information 
app.post('/statistic/getList',(request, response)=>{
    let sql = tempSql + `SELECT module_name,
						sum(quantities) AS quantities_total,
						COUNT(*) AS module_num,
						SUM(CASE WHEN da_ratio > 60 THEN 1 ELSE 0 END) AS module_qualified,
						SUM(CASE WHEN da_ratio >= 90 THEN 1 ELSE 0 END) AS module_excellent
						FROM temp_process
						WHERE branch_id = ? AND unit_id =?
						GROUP BY module_name;
`   
    let param = [request.body.branch_id,request.body.unitengineer_unit_id];
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



app.listen(8889, ()=>{
    console.log('Example app listening on port 8889!');
})