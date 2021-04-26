<template>
  <div class="app-addstudent">
    <el-tabs v-model="activeName">
      <el-tab-pane label="单个添加学生信息" name="first"
        ><div class="app-container">
          <el-card class="el-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 20px">添加学生信息</span>
              <!-- <el-button style="float: right" type="success" size="mini"
                >导入学生信息</el-button
              > -->
            </div>

            <el-form
              class="addForm"
              ref="addForm"
              :model="addForm"
              label-width="120px"
              :rules="addFormRules"
            >
              <el-form-item label="姓名" prop="student_name">
                <el-input v-model="addForm.student_name"></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="student_no">
                <el-input v-model="addForm.student_no"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="addForm.gender">
                  <el-radio label="male">男</el-radio>
                  <el-radio label="female">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="班级编号" prop="class_no">
                <!-- <el-input v-model="ruleForm.class_no"></el-input> -->
                <el-select v-model="addForm.class_no" placeholder="请选择班级">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="备注" prop="remark">
                <el-input v-model="addForm.remark"></el-input>
              </el-form-item>
              <center>
                <el-button type="primary" @click="onSubmit('addForm')"
                  >添加</el-button
                >
                <el-button @click="resetForm('addForm')">重置</el-button>
              </center>
            </el-form>
          </el-card>
        </div></el-tab-pane
      >
      <el-tab-pane label="批量导入学生信息" name="second"
        ><div class="app-container">
          <el-card>
            <div>
              <el-row type="flex" justify="space-around">
                <el-col :span="6" class="el-col-center">
                  <el-upload
                    class="upload"
                    action=""
                    :multiple="false"
                    :show-file-list="false"
                    accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :http-request="httpRequest"
                  >
                    <el-button type="success">导入学生数据</el-button>
                  </el-upload>

                  <!-- <el-button type="success" @click="dialogFormVisible = true"
              >导入成绩数据</el-button
            > -->
                </el-col>
                <el-col :span="6" class="el-col-center el-col-size"
                  ><span> 批量导入学生信息 </span></el-col
                >
                <el-col :span="6" class="el-col-center"
                  ><el-button type="primary" @click="sendStudent()"
                    >添加学生数据到后台</el-button
                  ></el-col
                >
              </el-row>
            </div>

            <el-table
              :data="studentInfo"
              element-loading-text="Loading"
              border
              stripe
              empty-text="暂无数据"
              highlight-current-row
              :default-sort="{ prop: 'student_no', order: 'descending' }"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                align="center"
                width="80"
              ></el-table-column>
              <el-table-column
                align="center"
                label="学生姓名"
                prop="student_name"
              >
                <template slot-scope="scope">{{
                  scope.row.student_name
                }}</template>
              </el-table-column>
              <el-table-column label="学号" align="center" prop="student_no">
                <template slot-scope="scope">{{
                  scope.row.student_no
                }}</template>
              </el-table-column>
              <el-table-column label="性别" align="center" prop="gender">
                <template slot-scope="scope">
                  <span>{{ scope.row.gender }}</span>
                </template>
              </el-table-column>
              <el-table-column label="班级号" align="center" prop="class_no">
                <template slot-scope="scope">
                  <span>{{ scope.row.class_no }}</span>
                </template>
              </el-table-column>

              <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.remark }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div></el-tab-pane
      >
      <!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "AddStudent",
  props: ["classlist"],
  data() {
    return {
      options: [],
      activeName: "first",
      studentInfo: [],
      sendlist: [],
      addForm: {
        student_name: "",
        student_no: "",
        gender: "",
        class_no: "",
        remark: "test",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        student_name: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            message: "姓名的长度在1~6个字符之间",
            trigger: "blur",
          },
        ],
        student_no: [
          { required: true, message: "请输入9位数的学号", trigger: "blur" },
          {
            required: true,
            message: "请输入9位数的学号",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, trigger: "blur" }],
        class_no: [
          { required: true, message: "请输入班级号", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入备注信息", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  watch: {
    classlist: function (val) {
      //console.log(val); // 接收父组件的值
      this.options = val;
    },
  },
  created() {
    this.getClassName();
  },
  methods: {
    httpRequest(e) {
      const file = e.file; // 文件信息
      console.log("e: ", e);
      console.log("file: ", e.file);

      if (!file) {
        // 没有文件
        return false;
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary", // 以字符编码的方式解析
          });
          const exlname = workbook.SheetNames[0]; // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]); // 生成json表格内容
          console.log(exl);
          // 将 JSON 数据挂到 data 里
          this.studentInfo = exl;

          // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
        } catch (e) {
          console.log("出错了：：");
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    handleSelectionChange(val) {
      //console.log(val);

      this.sendlist = val;
      // console.log(this.sendlist);
    },
    async sendStudent() {
      // this.sendlist.forEach(function (item) {
      //   list.push(item);
      // });

      var data = [...this.sendlist];
      console.log(data);
      await this.$http.post("/api/cms/stu/1?_method=POST", data).then((res) => {
        console.log(res);
      });
    },
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    onSubmit(formName) {
      console.log(this.addForm);
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取班级信息
    async getClassName() {
      await this.$http
        .post("/api/cms/class/1?_method=GET&class_no=")
        .then((res) => {
          if (res.status === 200) {
            var list = res.data.data;
            var class_list = [];

            list.forEach(function (item, index) {
              class_list[index] = {};

              class_list[index].value = item.class_no;
              class_list[index].label = item.class_name;
            });
            this.options = class_list;
            console.log(this.options);
          }
        });
    },
  },
};
</script>

<style scoped>
.app-addstudent {
  width: 80%;
  margin: 50px auto;
}
.line {
  text-align: center;
}
.add-title {
  text-align: center;
  color: black;
  font-size: 30px;
  margin-bottom: 20px;
}
/* .app-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 100px auto;
  width: 50%;
} */
.addform-button {
  text-align: center;
}
.el-card {
  position: relative;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  text-align: center;
}

.el-col-size {
  font-size: 25px;
  color: rgb(253, 6, 26);
  letter-spacing: 0;
  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
    0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
    0px 8px 7px #001135;
}
.el-col-center {
  text-align: center;
}
.line {
  text-align: center;
}
.app-container {
  padding-top: 30px;
  width: 100%;
  margin: 0 auto;
}
</style>