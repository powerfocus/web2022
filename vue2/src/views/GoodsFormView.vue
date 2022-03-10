<template>
  <div style="width: 100%;">
    <el-form label-position="right" :rules="rules" ref="form" :model="formData" label-width="100px">
      <el-row>
        <el-col :span="20">
          <el-form-item label="商品名称" prop="pname">
            <el-input v-model="formData.pname" size=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="价格" prop="price">
            <el-input v-model="formData.price" size=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="数量" prop="count">
            <el-input v-model="formData.count" size=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" size="">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "GoodsFormView",
  data() {
    return {
      formData: {
        pname: '',
        price: '',
        count: '',
      },
      rules: {
        pname: [
          {required: true, message: '请填写商品名',}
        ],
        price: [
          {required: true, message: '请填写价格',}
        ],
        count: [
          {required: true, message: '请填写数量',}
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/goods/add', this.formData, {})
            .then(rest => {
              this.$message('数据保存完成');
              location.reload();
            }).catch(err => {
              this.$message('发送请求时错误 ' + err);
          });
        } else {
          this.$message('验证失败！请检查表单数据');
          return false;
        }
      });
    }
  },
}
</script>

<style scoped>

</style>