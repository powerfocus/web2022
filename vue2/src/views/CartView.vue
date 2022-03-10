<template>
  <div style="width: 100%;">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button-group>
          <el-button type="" icon="el-icon-arrow-left" size="mini" @click="prevPage(page - 1)">上一页</el-button>
          <el-button type="" icon="el-icon-arrow-right" size="mini" @click="nextPage(page + 1)">下一页</el-button>
          <el-button type="" icon="el-icon-tickets" size="mini">{{ page }} / {{ data.totalPages }}页</el-button>
        </el-button-group>
        <el-table :data="tableData">
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span>{{ scope.row.pname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格">
            <template slot-scope="scope">
              <span>{{ scope.row.price | priceFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="text" size="mini" icon="el-icon-minus" @click="minusClick(scope)"></el-button>
                <el-button type="text" size="mini" disabled style="border: none; margin-left: 5px; margin-right: 5px;">
                  {{ scope.row.count }}
                </el-button>
                <el-button type="text" size="mini" icon="el-icon-plus" @click="plusClick(scope)"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="" size="mini" icon="el-icon-delete" @click="deleteSelect(scope)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "CartView",
  data() {
    return {
      data: {},
      tableData: [],
      page: 1,
    }
  },
  mounted() {
    this.getUrl(1);
  },
  methods: {
    getUrl(page) {
      axios.get('http://localhost:8080/goods', {
        params: {page: page},
      }).then(res => {
        if (res.status === 200) {
          this.data = res.data;
          this.tableData = this.data.content;
          console.log(res);
        } else {
          this.$message('请求服务器时失败！' + '错误代码 ' + res.status)
        }
      }).catch(err => {
        this.$message('获得列表时发生错误！' + err)
      });
    },
    minusClick(scope) {
      if (scope.row.count > 1) scope.row.count--;
    },
    plusClick(scope) {
      scope.row.count++;
    },
    deleteSelect(scope) {
      let id = scope.row.id;
      this.$confirm('真的要删除此项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get('http://localhost:8080/goods/del', {
          params: {id: id},
        }).then(res => {
          this.$message({type: 'success', message: res.data + ' 删除成功'})
          location.reload()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '记录删除失败 ' + err
          })
        });
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除操作已取消'
        });
      });
    },
    nextPage(page) {
      if (page > this.data.totalPages)
        page = this.data.totalPages;
      this.getUrl(page);
    },
    prevPage(page) {
      if (page < 1)
        page = 1;
      this.getUrl(page)
    },
  },
  filters: {
    priceFilter(price) {
      return '￥' + price.toFixed(2);
    },
  },
}
</script>

<style scoped>

</style>