<template>
  <div>
    <el-form :model="foodForm" ref="foodForm">
      <el-form-item label="名称" prop="name">
        <el-input type="" v-model="foodForm.name"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="region">
        <el-select placeholder="区域" v-model="foodForm.region">
          <el-option label="重庆" value="重庆"></el-option>
          <el-option label="北京" value="北京"></el-option>
          <el-option label="成都" value="成都"></el-option>
          <el-option label="上海" value="上海"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="date">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择时间" value-format="yyyy-MM-dd"
                          v-model="foodForm.date"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="foodForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="食物" prop="food">
        <el-checkbox-group v-model="foodForm.food">
          <el-checkbox label="火锅" name="food"></el-checkbox>
          <el-checkbox label="烧烤" name="food"></el-checkbox>
          <el-checkbox label="海鲜" name="food"></el-checkbox>
          <el-checkbox label="川菜" name="food"></el-checkbox>
          <el-checkbox label="粤菜" name="food"></el-checkbox>
          <el-checkbox label="湘菜" name="food"></el-checkbox>
          <el-checkbox label="鲁菜" name="food"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="type">
        <el-radio-group v-model="foodForm.type">
          <el-radio label="线上品牌"></el-radio>
          <el-radio label="线下品牌"></el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="resource-box">
        <dt>文件管理器 <el-button type="primary" size="mini" @click="fsLst('/')" title="返回根目录">/</el-button></dt>
        <dd>
          <el-row v-for="d in dirs">
            <el-link type="info" class="el-icon-folder" @click="getCurrDir">{{d.row}}</el-link>
          </el-row>
          <el-row v-for="f in files">
            <el-link type="info" class="el-icon-document" @click="getCurrFile">{{f.row}}</el-link>
          </el-row>
        </dd>
      </div>

      <el-form-item label="内容"></el-form-item>
      <el-form-item id="weditor" style="height: auto;"></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="resetForm('foodForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="文本文件浏览">
      <el-input type="textarea"></el-input>
    </el-dialog>

    <el-dialog title="图片浏览" :visible.sync="dialogTableVisible">
      <el-row>
        <el-button type="primary" plain size="small" @click="insertImg" style="margin-bottom: 10px;">插入到编辑器</el-button>
        <el-image :src="src" fit="fill"></el-image>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import E from 'wangeditor'

export default {
  name: "RequestView",
  data() {
    return {
      foodForm: {
        name: '',
        region: '',
        date: '',
        delivery: '',
        food: [],
        type: '线下品牌',
        editor: null,
      },
      path: '',
      dirs: [],
      files: [],
      dialogTableVisible: false,
      src: '',
    };
  },
  mounted() {
    this.editor = new E('#weditor');
    this.editor.config.zIndex = 500;
    this.editor.config.uploadImgServer = 'http://localhost:8080/upload';
    this.editor.config.uploadImgAccept = [];
    this.editor.config.uploadFileName = 'file';
    this.editor.config.menus = [
      'head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'indent',
      'lineHeight', 'foreColor', 'backColor', 'link', 'list', 'todo', 'justify', 'quote', 'emoticon',
      'image', 'video', 'table', 'code', 'splitLine', 'undo', 'redo',
    ];
    this.editor.create();

    this.fsLst();
  },
  methods: {
    onSubmit() {
      axios.post('http://localhost:8080/rest', {
        data: {
          name: this.foodForm.name,
          region: this.foodForm.region,
          date: this.foodForm.date,
          delivery: this.foodForm.delivery,
          food: this.foodForm.food,
          type: this.foodForm.type,
          edit: this.editor.txt.html(),
        },
      }).then(rest => {
        if (rest.status === 200) {
          this.$message('请求完成！');
        } else {
          this.$message('获取响应时发生错误 ' + rest.status);
        }
      }).catch(err => {
        this.$message('请求时发生错误！' + err);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    fsLst(p = '') {
      this.dirs = [];
      this.files = [];
      if (p) {
        this.path = p;
      }
      axios.get('http://localhost:8080/files/list', {
        params: {
          path: this.path,
        },
      }).then(rest => {
        this.$message('获取列表成功 ');
        for (let it in rest.data) {
          let curr = rest.data[it];
          if (curr.startsWith("$")) {
            this.dirs.push({row: curr.substr(1), type: 'dir',});
          } else {
            this.files.push({row: curr, type: 'file'});
          }
        }
      }).catch(err => {
        this.$message('获取列表时发生错误 ' + err);
      });
    },
    getCurrDir(evt) {
      this.path = evt.currentTarget.text.trim();
      let servUrl = 'http://localhost:8080/files/list';
      axios.get(servUrl, {
        params: {
          path: this.path,
        },
      }).then(rest => {
        if (rest.status === 200) {
          this.$message('数据获取完成');
          this.dirs = [];
          this.files = [];
          for (let it in rest.data) {
            let curr = rest.data[it];
            if (curr.startsWith("$")) {
              this.dirs.push({row: curr.substr(1), type: 'dir',});
            } else {
              this.files.push({row: curr, type: 'file'});
            }
          }
        }
      }).catch(err => {
        this.$message('获取数据时发生错误' + err);
      });
    },
    getCurrFile(evt) {
      this.path = evt.currentTarget.text.trim();
      let servUrl = '';
      let idx = this.path.lastIndexOf(".");
      let fileType = '';
      if (idx !== -1) {
        fileType = this.path.substr(idx);
        switch (fileType) {
          case 'txt':
            fileType = 'txt';
            servUrl = 'http://localhost:8080/files/txt';
            break;
          case '.jpg':
          case '.gif':
          case '.png':
            fileType = 'img';
            servUrl = 'http://localhost:8080/files/img';
            break;
          default:
            this.$message('不支持的文件类型');
            break;
        }
      } else {
        this.$message('未知的文件类型');
      }
      axios.get(servUrl, {
        params: {
          url: this.path,
        },
      }).then(rest => {
        if (rest.status === 200) {
          this.$message('获取图片数据成功');
          if (fileType === 'txt') {

          } else if(fileType === 'img') {
            this.src = servUrl + '?url=' + this.path;
            this.dialogTableVisible = true;
          }
        }
      }).catch(err => {
        this.$message('获取数据时发生错误 ' + err);
      });
    },
    insertImg() {
      this.editor.cmd.do('insertHTML', '<img src="' + this.src + '">');
    },
  },
}
</script>

<style scoped>
.resource-box {
  border: #ebebeb solid;
  border-radius: 5px;
  padding: 20px;
}
.resource-box dt {
  line-height: 35px;
  padding-bottom: 10px;
}
.resource-box dd {
  background-color: #f2f2f2;
  padding: 10px;
  line-height: 30px;
}
</style>