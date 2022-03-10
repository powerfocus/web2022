<template>
  <div class="container">
    <div class="row">
      <div class="col-md-auto">
        <h1>employees 列表</h1>
        <ul>
          <li v-for="it in rdata">{{it.empNo}} {{it.firstName}} {{it.lastName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "EmpList",
  data() {
    return {
      rdata: null,
    }
  },
  mounted() {
    axios
      .get('http://localhost:8080/emp/list', {
        params: {pageNum: 1, pageSize: 20},
      })
      .then(rest => {this.rdata = rest.data.content})
      .catch(function(err) {console.log(err)})
  },
  methods: {
    put: function(res) {
      this.msg = '修改一下';
    }
  }
}
</script>

<style scoped>

</style>