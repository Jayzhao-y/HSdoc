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
              <label for="project" class="block text-card-foreground">单位工程:</label>
              <el-select
                class=""
                v-model="formData.unitProject"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in unitProjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="flex flex-col">
              <label for="starCode" class="text-sm font-medium">分部工程名称</label>
              <el-select
                :class="styleSheet.input"
                v-model="formData.fenbuProName"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in fenbuProjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
              @click="addBranch"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- popUp multiadd  unitProjectOptions fenbuProjectOptions submitSheet-->
    <el-dialog :show-close="false" :visible.sync="dialogVisible_multiadd" width="0%" :modal="false">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative h-1/2">
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
              <label for="project" class="block text-card-foreground">单位工程:</label>
              <el-select
                class=""
                v-model="formData.unitProject"
                clearable
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in unitProjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="flex flex-col">
              <label for="starCode" class="block text-card-foreground">分部工程名称</label>
              <el-select
                v-model="formData.fenbuProName"
                clearable
                multiple
                :placeholder="placeholder"
              >
                <el-option
                  v-for="item in fenbuProjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
    <!-- checkView -->
    <el-dialog :show-close="false" :visible.sync="dialogCheckVisible" width="0%" :modal="false">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white w-1/2 h-1/2 p-6 rounded-lg shadow-lg relative">
          <div class="tableContent_check">
            <button
            class="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700"
            aria-label="Close"
            @click="dialogCheckVisible = false"
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
            <p class="text-card-foreground text-lg"></p>
            <el-table
              :data="tableData_check"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                v-for="item in TZ_title_List_inner"
                :key="item.id"
                align="center"
                :prop="item.prop"
                :label="item.lable"
                fit
              >
              </el-table-column>
            </el-table>
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
        style="width: 100%;"
        @selection-change="handleSelectionChange"
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
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import contenHelper from '../utils/contentHelper.js'
import styleSheet from '../styles/styleSheet'
import API  from '../api/branch'
import API_unit  from '../api/unit'
let timers = null
export default {
  data() {
    return {
      //add
      unitProjectOptions: [],
      dialogVisible: false,
      dialogCheckVisible: false,
      formData: {
        unitProject: '',
        fenbuProName: [],
        startCode: [],
        endCode: []
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
          prop: 'unit_name',
          lable: '单位工程名称'
        },
        {
          prop: 'unit_concat',
          lable: '单位工程起始桩号'
        },
        {
          prop: 'branchtype_name',
          lable: '分部工程名称'
        },
        {
          prop: 'branch_concat',
          lable: '分部工程起始桩号'
        }
      ],
      TZ_title_List_inner: [
        {
          prop: 'module_name',
          lable: '单元工程种类'
        },
        {
          prop: 'quantities_total',
          lable: '工程量'
        },
        {
          prop: 'module_num',
          lable: '单元工程个数'
        },
        {
          prop: 'module_qualified',
          lable: '合格个数'
        },
        {
          prop: 'module_excellent',
          lable: '优良个数'
        },
        // {
        //   prop: 'branch_concat',
        //   lable: '备注'
        // }
      ],
      tableData: [],
      tableData_check: [],
    }
  },
  methods: {
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
      console.log(row);
      
      this.dialogCheckVisible = true;
      API.getSatistic({
        branch_id:row.branch_id,
        unitengineer_unit_id:row.unit_id,
      }).then((res)=>{
        this.tableData_check = [];
        let arr = res.data[3];
        arr.map(item =>{
          let keys = Object.keys(item)
          let values = Object.values(item)
          let tempKV ={};
          for(var idx in keys){
            tempKV[`${keys[idx]}`] = values[idx]
          }
             this.tableData_check.push(tempKV)
        })
      })
    },
    deleteTableList() {
      
      this.$confirm('确认删除？此操作将忽略存在单元工程实例的分部工程。')
        .then((_) => {
          API.deleteBranch(this.multipleSelection).then((res)=>{
            console.log(res.data.affectedRows);
            this.$message(`此次成功删除 ${res.data.affectedRows} 条`);
            this.getBranch();
          })
          done()
        })
        .catch((_) => {})
    },
    getBranch(){
      API.getBranch().then((res)=>{
        this.tableData = [];
        let arr = res.data[1];
        arr.map(item =>{
          let keys = Object.keys(item)
          let values = Object.values(item)
          let tempKV ={};
          for(var idx in keys){
            tempKV[`${keys[idx]}`] = values[idx]
          }
             this.tableData.push(tempKV)
        })
        console.log("---page reflash---");
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    getUnit(){
      this.unitProjectOptions = []
      API_unit.getUnit().then(res=>{
        let arr=[];
        let form = res.data;
        for(var key of form){
            arr.push({
            label: key.unit_name,
            value: key.unit_id
          })
        }
        this.unitProjectOptions = arr
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    getBranchType(){
      this.fenbuProjectOptions = []
      API.getBranchType().then((res)=>{
        let arr = res.data;
        for(var key of arr){
          this.fenbuProjectOptions.push({
          value:key.branchtype_id,
          label:key.branchtype_name
        })
        }
   
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    addBranch() {
       console.log(this.formData);
       let form = this.formData
       let tmpArr = [];
          tmpArr.push({
            branch_startpile:form.startCode[0],
            branch_endpile:form.endCode[0],
            unitengineer_unit_id:form.unitProject,
            branch_name:form.fenbuProName,
          })
      API.addBranch(tmpArr).then(res=>{
        console.log(res);
      }).then(()=>{
        this.formData = {
        unitProject: '',
        fenbuProName: [],
        startCode: [],
        endCode: []
      }
      this.codeTableData = [{}]
      this.getBranch();
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    submitSheet() {
      let form = this.formData
       let tmpArr = [];
      for(var fbName of form.fenbuProName){
        for(var idx in form.endCode){
          tmpArr.push({
            branch_startpile:form.startCode[idx],
            branch_endpile:form.endCode[idx],
            unitengineer_unit_id:form.unitProject,
            branch_name:fbName,
          })
        }
      }
      API.addBranch(tmpArr).then(res=>{
        console.log(res);
      }).then(()=>{
        this.formData = {
        unitProject: '',
        fenbuProName: [],
        startCode: [],
        endCode: []
      }
      this.codeTableData = [{}]
      this.getBranch();
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach((element) => {
        return this.multipleSelection.push(element.branch_id)
      })
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
    this.getBranchType();
    this.getBranch();
    this.getUnit();

  }
}
</script>
<style>
.tableContent_check{
  height: 900px;
  overflow-y: scroll;
}
.tableContent{
  height: 900px;
  overflow-y: scroll;
}
</style>