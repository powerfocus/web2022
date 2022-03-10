<template>
  <div>{{msg}}</div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
      <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import axios from "axios";

export default {
  name: "IndexView",
  data() {
    return {
      msg: '',
      ruleForm: {
        pass: '',
        name: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      }
    };
  },
  filters: {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/login', {
            name: this.ruleForm.name,
            pwd: this.ruleForm.pass,
          }, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          }).then(res => {
            if (res.status === 200) {
              this.msg = '登录成功！';
              console.log(res.data)
            } else {
              this.msg = '登录失败！';
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>

</style>