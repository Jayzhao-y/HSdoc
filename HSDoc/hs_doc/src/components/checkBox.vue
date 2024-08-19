<template>
  <div class="checkBox">
    <div style="margin: 15px 0"></div>
    <el-checkbox-group v-model="checkedArrs" @change="handlecheckedArrsChange">
      <el-checkbox v-for="item in processArr" @key="item.value" :label="item.value" :key="item.value">{{
        item.label
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: ['processArrs'],
  data() {
    return {
      checkAll: false,
      checkedArrs: [],
      processArr: [],
      isIndeterminate: false
    }
  },
  methods: {
    handlecheckedArrsChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.processArr.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.processArr.length
      this.$emit('child-event',this.checkedArrs)
    }
  },
  watch:{
    processArrs(){
        this.processArr = this.processArrs
    }
  },
  mounted(){
    this.processArr = this.processArrs
  }
}
</script>
<style>
.checkBox{
        height: 100px;
        height: 100px;
    overflow-y: scroll;
}
</style>