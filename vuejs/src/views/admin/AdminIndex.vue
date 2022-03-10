<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10">
        <h1>欢迎使用本系统</h1>
        <div>
          <button id="m_btn" class="btn btn-primary">按钮</button>
        </div>
        <div>
          <div>
            <ul>
              <li><a href="/admin/article/add">添加文章</a></li>
              <li>文章管理</li>
            </ul>
            <ul>
              <li><a href="">添加产品</a></li>
              <li>产品管理</li>
            </ul>
            <ul>
              <li><a href="/admin/emplist">测试列表</a></li>
            </ul>
          </div>
        </div>
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
  name: "AdminIndex"
}
$(function() {
  $('#m_btn').click(function() {
    alert('你点击了这个按钮！')
  })
})
</script>

<style scoped>

</style>