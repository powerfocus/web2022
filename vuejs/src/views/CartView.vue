<template>
  <div>
    <h1>Shop Cart</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="商品名"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="count" label="数量">
        <template slot-scope="row">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"><button>移除</button></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CartView",
  data() {
    return {
      tableData: [
        {
          title: 'java编程思想',
          price: 108.00,
          count: 1
        },
        {
          title: 'c++编程思想',
          price: 139.00,
          count: 1
        },
        {
          title: 'c++沉思录',
          price: 45.00,
          count: 1
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>