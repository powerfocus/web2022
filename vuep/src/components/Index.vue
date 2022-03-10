<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10">
        <h1>hello world</h1>
        <p>这是一个vue前端程序</p>
        <p>{{pageName}}</p>
        <button id="btn" class="btn btn-primary">按钮</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'
export default {
  name: "Index",
  data: function () {
    return {
      'pageName': '站点首页',
    }
  },
}
$(function() {
  $('#btn').click(function() {
    alert('你点击了一个按钮！');
  });
});
</script>

<style scoped>

</style>