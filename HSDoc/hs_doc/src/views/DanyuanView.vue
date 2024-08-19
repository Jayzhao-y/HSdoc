<template>
  <div class="Taizhang">
    <!-- popUp add  unitProjectOptions submitSheet-->
    <el-dialog :show-close="false" :visible.sync="dialogVisible" width="0%" :modal="false">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
          <button
            class="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700"
            aria-label="Close"
            @click="dialogVisible = false"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 class="text-2xl font-bold text-center mb-4">新增单位工程</h2>
          <div class="space-y-4">
            <div class="flex flex-col">
              <label for="project" class="block text-card-foreground">单元名称</label>
              <input
                    type="text"
                    id="start-number"
                    name="start-number"
                    :placeholder="placeholder"
                    :class="styleSheet.inputMini"
                    v-model="formData.moduleTypeName"
                  />
            </div>
            <div class="flex flex-col">
              <label for="starCode" class="text-sm font-medium">单元划分频率</label>
              <el-select
                :class="styleSheet.input"
                v-model="formData.frequency"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in frequencyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <!-- <div class="flex flex-col">
             
                <div>
                  <label for="start-number" class="block text-card-foreground">工序工程</label>
                  <el-select
                :class="styleSheet.inputMini"
                v-model="formData.process"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in ProcessOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
                </div>
            
            </div> -->
            <button
              class="bg-primary text-primary-foreground w-full py-2 rounded-md hover:bg-primary/80"
              @click="addModuleType"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- sheet -->
    <el-dialog :show-close="false" :visible.sync="dialogVisibleSheet" width="0%" :modal="false">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white w-full h-1/4 max-w-md p-6 rounded-lg shadow-lg relative">
          <button
            class="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700"
            aria-label="Close"
            @click="dialogVisibleSheet = false"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 class="text-2xl font-bold text-center mb-4">上传文件</h2>
          <div class="space-y-8">
            <el-upload
              class="upload-demo"
              action="api/moduleType/uploadSheet"
             :http-request="uploadFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="10"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">请上传文件</div>
            </el-upload>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- header -->
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-zinc-400 text-2xl font-semibold">{{ VIEW_TITLE }}</h2>
      <div class="flex gap-5">
        <button
          @click="dialogVisible = true"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-6 rounded-lg transition-all duration-300 shadow-lg"
        >
          新增
        </button>
        <button
          @click="deleteTableList"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-6 rounded-lg transition-all duration-300 shadow-lg"
        >
          删除
        </button>
      </div>
    </div>
    <!-- tableContent -->
    <div class="tableContent">
      <p class="text-card-foreground text-lg"></p>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
         @row-click="handleClick"
      >
        <el-table-column type="selection" width="70" align="center"> </el-table-column>
        <el-table-column type="index" width="90" align="center" label="序号"> </el-table-column>
        <el-table-column
          v-for="item in TZ_title_List"
          :key="item.id"
          align="center"
          :prop="item.prop"
          :label="item.lable"
          fit
        >
        <template slot-scope="scope" >
          <div v-if="scope.row.moduletype_id == currentID">
            <el-select
            v-if="item.prop =='segment_content'"
                :class="styleSheet.input"
                v-model="scope.row.segment_id"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in frequencyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
               v-else-if="item.prop =='process_names'"
                v-model="scope.row.process_ids"
                clearable
                multiple
                :placeholder="placeholder"
                @change="handlePro"
              >
                <el-option
                  v-for="item in ProcessOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>        
              <el-input v-model="scope.row[item.prop]" v-else ></el-input>
            <!-- <p v-else>{{ scope.row[item.prop] }} </p> -->
          </div >
          <div v-else>
           <p >{{ scope.row[item.prop] }} </p>
          </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClickSheet(scope.row)" type="text" size="small">表</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="currentID !== scope.row.moduletype_id">编辑</el-button>
            <el-button @click="updateModuleType(scope.row)" type="text" size="small" v-else>保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import contenHelper from '../utils/contentHelper.js'
import styleSheet from '../styles/styleSheet'
import API  from '../api/moduleType'
import API_unit  from '../api/unit'
let timers = null
export default {
  data() {
    return {
      fileList:[],
      frequencyOptions:[],
      currentID:null,
      //add
      unitProjectOptions: [],
      dialogVisible: false,
      dialogVisibleSheet: false,
      formData: {
        frequency:'',
        process:'',
        moduleTypeName:''
      },
      //multi
      multipleSelection: [],
      placeholder: '请输入',
      fenbuProjectOptions: [],
      styleSheet: styleSheet,
      formDataGroup: [],
      dialogVisible_multiadd: false,
      codeTableData: [{}],

      VIEW_TITLE: contenHelper.VIEW_TITLE,
      TZ_title_List: [
        {
          prop: 'moduletype_name',
          lable: '单元名称'
        },
        {
          prop: 'segment_content',
          lable: '单元划分频率'
        },
        {
          prop: 'process_names',
          lable: '工序工程'
        },
      ],
      tableData: [],
      ProcessOptions:[]
    }
  },
  methods: {
    uploadFile(params){
      const formData = new FormData();
      formData.append('file', params.file);
      formData.append('moduletype_id',this.currentID);
      this.fileList =[]
      API.uploadFile(formData).then(res=>{
        API.getSheetList( {sheet_id :this.currentID }).then(res=>{
        
        let arr = res.data
        arr?.map(item =>{
          this.fileList.push({
            name: item.mould_name, 
            sheet_id: item.mould_id, 
            url: item.mould_path})
        })
      })
      })
    },
    handleClickSheet(row){
      this.currentID = row.moduletype_id
      this.fileList =[]
      API.getSheetList( {sheet_id :this.currentID }).then(res=>{
        let arr = res.data
        arr?.map(item =>{
          this.fileList.push({
            name: item.mould_name, 
            sheet_id: item.mould_id, 
            url: item.mould_path})
        })
        this.dialogVisibleSheet = true
      })

    },
    handleRemove(file, fileList) {
        API.deleteSheetList({sheet_id:file.sheet_id}).then(res=>{
          console.log(res);
          
        })
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    handlePro(row){
      
      
    },
    handleClick(row) {
      this.currentID = row.moduletype_id
    },
    deleteTableList() {
      this.$confirm('确认删除？此操作将忽略存在单元工程实例的单元类型。')
        .then((_) => {
          API.deleteModuleType(this.multipleSelection).then((res)=>{
            this.getModuleType();
          })
          done()
        })
        .catch((_) => {})
    },
    isJson(obj){
      try {
              JSON.parse(obj);
              return true;
            } catch (error) {
              return false;
            }
    },
    getModuleType(){
      API.getModuleType().then((res)=>{
        this.tableData = [];
        let arr = res.data;
        arr.map(item =>{
          let keys = Object.keys(item)
          let values = Object.values(item)
          let tempKV ={};
          for(var idx in keys){
            if(this.isJson(values[idx])){
              tempKV[`${keys[idx]}`] = JSON.parse(values[idx])
            }else{
              tempKV[`${keys[idx]}`] = values[idx]
            }
            
            
          }
             this.tableData.push(tempKV)
        })
        console.log("---page reflash---");
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    addModuleType() {
       let form = this.formData
       let tmpArr = {
        moduletype_name:form.moduleTypeName,
        modulesegment_id:form.frequency
       };
      API.addModuleType(tmpArr).then(res=>{
        console.log(res);
      }).then(()=>{
        this.formData = {
          frequency:'',
        process:'',
        moduleTypeName:''
      }
      this.codeTableData = [{}]
      this.getModuleType();
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach((element) => {
        return this.multipleSelection.push(element.moduletype_id)
      })
    },
    updateModuleType(row){
      let params = [row,row.moduletype_id]
      console.log(row);
      
      API.updateModuleType(params).then((res)=>{
        this.getModuleType();
      }).then(()=>{
        this.currentID = null
      })
    },
    getFreq(){
      API.getFreq().then(res=>{
        let arr=[];
        let form = res.data;
        for(var key of form){
            arr.push({
            label: key.segment_content,
            value: key.segment_id
          })
        }
        this.frequencyOptions = arr

        
      })
    },
    getProcessList(){
      API.getProcessList().then(res=>{
        let arr=[];
        let form = res.data;
        for(var key of form){
            arr.push({
            label: key.process_name,
            value: key.process_id
          })
        }
        this.ProcessOptions = arr

        
      })
    },
  },
  mounted(){
    this.getModuleType();
    this.getFreq();
    this.getProcessList();

  }
}
</script>
<style>
.el-upload-list{
  height: 100px !important;
  overflow-y: scroll;
}
</style>