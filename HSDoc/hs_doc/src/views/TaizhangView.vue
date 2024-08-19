<template>
  <div class="Taizhang">
    <!-- popUp   placeholder styleSheet formData-->
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
          <h2 class="text-2xl font-bold text-center mb-4">新增分布工程</h2>
          <div class="space-y-4">
            <div class="flex flex-col">
              <label for="name" class="text-sm font-medium">单位工程</label>
              <input
                type="text"
                id="name"
                name="name"
                :placeholder="placeholder"
                :class="styleSheet.input"
                v-model="formData.name"
                required
              />
            </div>
            <div class="flex flex-col">
              <label for="startCode" class="text-sm font-medium">起点桩号</label>
              <input
                type="text"
                id="startCode"
                name="startCode"
                :placeholder="placeholder"
                :class="styleSheet.input"
                v-model="formData.startCode"
                required
              />
            </div>
            <div class="flex flex-col">
              <label for="endCode" class="text-sm font-medium">终点桩号</label>
              <input
                type="text"
                id="endCode"
                name="endCode"
                :placeholder="placeholder"
                :class="styleSheet.input"
                v-model="formData.endCode"
                required
              />
            </div>
            <button
              class="bg-primary text-primary-foreground w-full py-2 rounded-md hover:bg-primary/80"
              @click="addUnit"
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
    <div class="">
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import contenHelper from '../utils/contentHelper.js'
import styleSheet from '../styles/styleSheet'
import API  from '../api/unit'
export default {
  data() {
    return {
      placeholder: '请输入',
      styleSheet: styleSheet,
      multipleSelection: [],
      formData: {
        name: '',
        startCode: '',
        endCode: ''
      },
      dialogVisible: false,
      VIEW_TITLE: contenHelper.VIEW_TITLE,
      TZ_title_List: [
        {
          prop: 'unitName',
          lable: '单位工程名称'
        },
        {
          prop: 'unitCode',
          lable: '单位工程起始桩号'
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
      this.$confirm('确认删除？此操作将忽略存在分部工程实例的单位工程。')
        .then((_) => {
          API.deleteUnit(this.multipleSelection).then((res)=>{
            this.$message(`此次成功删除 ${res.data.affectedRows} 条`);
            this.getUnit();
          })
          
          done()
        })
        .catch((_) => {})
    },
    getUnit(){
      API.getUnit().then((res)=>{
        this.tableData = []
        for(var item of res.data){
          let id = item.unit_id;
          let unitName = item.unit_name;
          let unitCode = item.unit_startpile +'-'+ item.unit_endpile;

          this.tableData.push({
            id:id,
            unitName:unitName,
            unitCode:unitCode
          })
        }
        console.log("---page reflash---");
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    addUnit() {
      
      let arr=[];
      let form = Object.values(this.formData)
       for(var key of form)arr.push(key)
      API.addUnit(arr).then((res)=>{
        this.getUnit();
      }).catch((err)=>{
        console.log(err);
        
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach((element) => {
        return this.multipleSelection.push(element.id)
      })
    }
  },
  mounted(){
    this.getUnit()
  }
}
</script>
