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
          <h2 class="text-2xl font-bold text-center mb-4">新增分部工程</h2>
          <div class="space-y-4">
            <div class="flex flex-col">
              <label for="project" class="block text-card-foreground">分部名称</label>
              <input
                    type="text"
                    id="start-number"
                    name="start-number"
                    :placeholder="placeholder"
                    :class="styleSheet.inputMini"
                    v-model="formData.branchtype_name"
                  />
              
            </div>
            <button
              class="bg-primary text-primary-foreground w-full py-2 rounded-md hover:bg-primary/80"
              @click="addBranchType"
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
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import contenHelper from '../utils/contentHelper.js'
import styleSheet from '../styles/styleSheet'
import API  from '../api/branchType'
let timers = null
export default {
  data() {
    return {
      //add
      unitProjectOptions: [],
      dialogVisible: false,
      formData: {
        branchtype_name: ''

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
          prop: 'branchtype_name',
          lable: '分部工程名称'
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleClick(row) {
      console.log('row::::', row)
    },
    deleteTableList() {
      this.$confirm('确认删除？此操作将忽略存在分部工程实例的分部类型。')
        .then((_) => {
          API.deleteBranchType(this.multipleSelection).then((res)=>{
            this.getBranchType();
          })
          done()
        })
        .catch((_) => {})
    },
    getBranchType(){
      API.getBranchType().then((res)=>{
        this.tableData = [];
        let arr = res.data;
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
    addBranchType() {

       let form = this.formData
       let tmpArr = {
        branchtype_name:form.branchtype_name,
       };
      API.addBranchType(tmpArr).then(res=>{
        console.log(res);
      }).then(()=>{
        this.formData = {
          branchtype_name: '',
      }
      this.codeTableData = [{}]
      this.getBranchType();
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach((element) => {
        return this.multipleSelection.push(element.branchtype_id)
      })
    }
  },
  mounted(){
    this.getBranchType();


  }
}
</script>
<style>

</style>