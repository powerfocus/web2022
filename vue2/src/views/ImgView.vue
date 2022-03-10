<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" style="width: 130px; float: left; padding: 5px; margin: 0 5px;" v-for="u in url">
      <el-image :src="u" style="width: 100%;"></el-image>
      <div style="text-align: center;">不错不错</div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ImgView",
  data() {
    return {
      url: [],
    };
  },
  mounted() {
    this.getList('http://localhost:8080/files/list?path=2022-03-05');
  },
  methods: {
    getList(url) {
      axios.get('http://localhost:8080/files/list?path=2022-03-05', {})
        .then(res => {
          this.$message('获取数据完成');
          this.url = res.data;
          this.url = this.url.map(it => 'http://localhost:8080/files/img?url=' + it);
        }).catch(err => {
          this.$message('获得信息时发生错误！' + err);
      });
    },
  },
}
</script>

<style scoped>

</style>