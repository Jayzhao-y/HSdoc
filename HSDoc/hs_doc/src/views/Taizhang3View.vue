<template>
  <div class="Taizhang">
    <!-- popUp add  branchProjectOptions submitSheet-->
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
              <label for="project" class="block text-card-foreground">分部工程:</label>
              <el-select
                class=""
                v-model="formData.branchProject"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in branchProjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
        
            <div class="flex flex-col">
              <label for="starCode" class="text-sm font-medium">单元划分频率</label>
              <el-select
                :class="styleSheet.input"
                v-model="formData.frequency"
                clearable
                :placeholder="placeholder"
                @change="handleProcessArr"
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
            <div class="flex flex-col">
              <label for="starCode" class="text-sm font-medium">选择单元工程</label>
              <el-select
                :class="styleSheet.input"
                v-model="formData.moduleType[0]"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in tempProArrs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="flex flex-col">
              <label for="start-number" class="block text-card-foreground">施工编号</label>
                  <input
                    type="text"
                    id="start-number"
                    name="start-number"
                    :placeholder="placeholder"
                    :class="styleSheet.inputMini"
                    v-model="formData.constructCode"
                  />
            </div>
            <div class="flex flex-col">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="start-number" class="block text-card-foreground">起点桩号:</label>
                  <input
                    type="text"
                    id="start-number"
                    name="start-number"
                    :placeholder="placeholder"
                    :class="styleSheet.inputMini"
                    v-model="formData.startCode[0]"
                  />
                </div>
                <div>
                  <label for="end-number" class="block text-card-foreground">终点桩号:</label>
                  <input
                    type="text"
                    id="end-number"
                    name="end-number"
                    :placeholder="placeholder"
                    :class="styleSheet.inputMini"
                    v-model="formData.endCode[0]"
                  />
                </div>
              </div>
            </div>
            <button
              class="bg-primary text-primary-foreground w-full py-2 rounded-md hover:bg-primary/80"
              @click="addModule"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- popUp multiadd  branchProjectOptions frequencyOptions submitSheet-->
    <el-dialog :show-close="false" :visible.sync="dialogVisible_multiadd" width="0%" :modal="false">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative h-100">
          <button
            class="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700"
            aria-label="Close"
            @click="dialogVisible_multiadd = false"
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
              <label for="project" class="block text-card-foreground">分部工程:</label>
              <el-select
                class=""
                v-model="formData.branchProject"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in branchProjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="flex flex-col">
              <label for="starCode" class="text-sm font-medium">单元划分频率</label>
              <el-select
                :class="styleSheet.input"
                v-model="formData.frequency"
                clearable
                :placeholder="placeholder"
                @change="handleProcessArr"
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
            <div class="flex flex-col">
              <label for="starCode" class="text-sm font-medium">单元工程名称</label>
              <checkBox :processArrs="tempProArrs" @child-event ="handleChildEvent"></checkBox>
            </div>
            <div class="flex flex-col h-52">
              <el-table :data="codeTableData" style="width: 100%" max-height="200">
                <el-table-column type="index" align="center" fit label="序号"> </el-table-column>
                <el-table-column label="开始桩号" fit>
                  <template slot-scope="scope">
                    <input
                      type="text"
                      id="start-number"
                      name="start-number"
                      :placeholder="placeholder"
                      :class="styleSheet.inputMini"
                      v-model="formData.startCode[scope.$index]"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="结束桩号" fit>
                  <template slot-scope="scope">
                    <input
                      v-focus-next="{ delay: 1 }"
                      type="text"
                      id="start-number"
                      name="start-number"
                      :placeholder="placeholder"
                      :class="styleSheet.inputMini"
                      v-model="formData.endCode[scope.$index]"
                      @keyup.enter="searchBtn"
                    />
                  </template>
                </el-table-column>
              </el-table>
              <div class="grid grid-cols-2 gap-4"></div>
            </div>
            <button
              class="bg-primary text-primary-foreground w-full py-2 rounded-md hover:bg-primary/80"
              @click="submitSheet"
            >
              Submit
            </button>
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
          @click="dialogVisible_multiadd = true"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-6 rounded-lg transition-all duration-300 shadow-lg"
        >
          批量新增
        </button>
        <button
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-6 rounded-lg transition-all duration-300 shadow-lg"
        >
          下载
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
        class=“el-table–scrollable-y”
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
            <el-input v-model="scope.row[item.prop]"  v-if="scope.row.module_id == currentID && !disableList.includes(item.prop)"></el-input>
            <p v-else>{{ scope.row[item.prop] }} </p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="currentID !== scope.row.module_id">编辑</el-button>
            <el-button @click="updateModule(scope.row)" type="text" size="small" v-else>保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import contenHelper from '../utils/contentHelper.js'
import styleSheet from '../styles/styleSheet'
import API  from '../api/module'
import API_getModuleType  from '../api/moduleType'
import API_branch  from '../api/branch'
import checkBox from '../components/checkBox.vue'
import { v4 as uuidv4 } from 'uuid'
let timers = null
export default {
  components:{
    checkBox
  },
  data() {
    return {
      //add
      branchProjectOptions: [],
      dialogVisible: false,
      formData: {
        branchProject: '',
        moduleType: [''],
        frequency: '',
        startCode: [],
        endCode: [],
        constructCode:''
      },
      //multi
      multipleSelection: [],
      placeholder: '请输入',
      frequencyOptions: [],
      moduleTypeOptions: [],
      styleSheet: styleSheet,
      formDataGroup: [],
      dialogVisible_multiadd: false,
      codeTableData: [{}],

      VIEW_TITLE: contenHelper.VIEW_TITLE,
      TZ_title_List: [
      {
        prop: 'unit_name',
        lable: '单位工程名称'
      },
      {
        prop: 'unit_concat',
        lable: '单位起始桩号'
      },
      {
        prop: 'branchtype_name',
        lable: '分部工程名称'
      },
      {
        prop: 'branch_concat',
        lable: '分部起始桩号'
      },
      {
        prop: 'module_name',
        lable: '单元工程名称'
      },
      {
        prop: 'module_concat',
        lable: '起始桩号'
      },
      {
        prop: 'module_process',
        lable: '工序'
      },
      {
        prop: 'construct_code',
        lable: '施工编号'
      },
      {
        prop: 'construct_date',
        lable: '施工日期'
      },
      {
        prop: 'finish_date',
        lable: '完成日期'
      },
      {
        prop: 'reply_date',
        lable: '批复日期'
      },
      {
        prop: 'quantities',
        lable: '工程量'
      },
      {
        prop: 'da_ratio',
        lable: '优良率'
      }
      ],
      tableData: [],
      currentID:null,
      currentRow:null,
      disableList:['module_process','unit_name','unit_concat','branchtype_name','branch_concat','module_name','module_concat'],
      processArrs:[],
      tempProArrs:[]
    }
  },
  computed:{
    isDis(){
      return true
    },
  },
  methods: {
    handleChildEvent(payload) {
      this.formData.moduleType = payload

    },
    searchBtn() {
      clearTimeout(timers)
      timers = setTimeout(() => {
        this.autoPush(this.formData.endCode) //需要防抖的函数
      }, 200)
    },
    autoPush(newv) {
      if (newv.length != 0) {
        if (this.dialogVisible_multiadd) {
          this.formData.startCode.push(newv[newv.length - 1])
        }
        this.codeTableData.push({})
      }
    },
    handleClick(row) {
      let tempObj = row;
      this.currentID = row.module_id
      this.currentRow = row
    },
    deleteTableList() {
      this.$confirm('确认删除？')
        .then((_) => {
          API.deleteModule(this.multipleSelection).then((res)=>{
            this.getModule();
          })
          done()
        })
        .catch((_) => {})
    },
    getModuleType(){
      API_getModuleType.getModuleTypeList().then((res)=>{
        let arr=[];
        let form = res.data;
        for(var key of form){
            arr.push({
            label: key.moduletype_name,
            value: key.moduletype_id,
            segment: key.modulesegment_id
          })
        }
         this.processArrs  = this.moduleTypeOptions = arr
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    getModule(){
      API.getModule().then((res)=>{
        this.tableData = [];
        let arr = res.data[res.data.length -1];
        arr.map(item =>{
          let keys = Object.keys(item)
          let values = Object.values(item)
          let tempKV ={};
          for(var idx in keys){
            tempKV[`${keys[idx]}`] = values[idx]
          }
             this.tableData.push(tempKV)
        })
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    updateModule(row){
      let params = [row,row.module_id]
      API.updateModule(params).then((res)=>{
        this.currentID = null;
        this.getModule();
      }).then(()=>{
       
      })
    },
    getBranch(){
      API_branch.getBranch().then((res)=>{
        let arr=[];
        let form = res.data[1];
        for(var key of form){
            arr.push({
            label: key.branchtype_name,
            value: key.branch_id
          })
        }
        this.branchProjectOptions = arr
      }).catch((err)=>{
        console.log(err);
        
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
    addModule() {
       let form = this.formData
       let tmpArr = [];
          tmpArr.push({
            branchengineer_branch_id:form.branchProject,
            module_name:form.moduleType[0],
            modulesegment_segment_id:form.frequency,
            module_start:form.startCode[0],
            module_end:form.endCode[0],
            construct_code:form.constructCode,
            module_process:0
          })
          API.getProcessNum({process_id:form.moduleType}).then((res)=>{
            if(res.data.code != -1){
              let str = res.data[0].ids
              let arr = str?str.split(',').map(Number):[];

              for(let item of arr){
              tmpArr[0].module_process = item;
              API.addModule(tmpArr).then(res=>{
                }).then(()=>{
                  this.formData={
                  branchProject: '',
                  moduleType: [''],
                  frequency: '',
                  startCode: [],
                  endCode: [],
                  constructCode:'',
                  module_process:0
                }
                this.codeTableData = [{}]
                this.getModule();
                }).catch((err)=>{
                  console.log(err);
                  
                })
            }
            }
            
          })
      
    },
    submitSheet() {
      let form = this.formData
       let tmpArr = [];
       let arr=[];
      for(var moduleName of form.moduleType){
        for(var idx in form.endCode){
          tmpArr.push({
            branchengineer_branch_id:form.branchProject,
            module_name:moduleName,
            modulesegment_segment_id:form.frequency,
            module_start:form.startCode[idx],
            module_end:form.endCode[idx],
            construct_code:form.constructCode,
            module_process:0,
            process_relation_id:''
          })
        }
      }

      for(var inner of tmpArr){
        let item = inner
      API.getProcessNum({process_id:item.module_name}).then((res)=>{
            if(res.data.code != -1){
              let str = res.data[0].ids
               arr = str?str.split(',').map(Number):[];
            }
            const uuid_instance = uuidv4()
            for(let index in arr){
              item.module_process = arr[index];
              item.process_relation_id = uuid_instance;
              
              API.addModule([item]).then(res=>{
                }).then(()=>{
                  this.formData={
                  branchProject: '',
                  moduleType: [0],
                  frequency: '',
                  startCode: [],
                  endCode: [],
                  constructCode:'',
                  module_process:0,
                  process_relation_id:''
                }
                this.codeTableData = [{}]
                this.multipleSelection = []
                this.tempProArrs =[]
                this.getModule();
                }).catch((err)=>{
                  console.log(err);
                  
                })
              
            }
          })
        } 
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      
      val.forEach((element) => {
        return this.multipleSelection.push(element.module_id)
      })
    },
    handleProcessArr(){
     
      let currentFrequncy = this.formData.frequency;
      this.tempProArrs =this.processArrs
      this.tempProArrs = this.tempProArrs.filter(item=>{
          return item.segment ==currentFrequncy
      })
      
      
    }
  },
  watch:{
    currentRow(newV,oldV){
      if(oldV!=null){
        // this.updateModule(oldV)
      }
    }
  },
  directives: {
    focusNext: {
      bind(el, binding) {
        const delay = binding.value.delay || 0
        setTimeout(() => {
          el.focus()
        }, delay)
      }
    }
  },
  mounted(){
    this.getModule();
    this.getBranch();
    this.getFreq();
    this.getModuleType();
   

    
    // this.getUnit();

  }
}
</script>
<style>
.tableContent{
  height: 900px;
  overflow-y: scroll;
}

</style>
