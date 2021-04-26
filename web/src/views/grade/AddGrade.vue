<template>
  <div class="app-container">
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
              <el-button type="success">上传成绩数据</el-button>
            </el-upload>

            <!-- <el-button type="success" @click="dialogFormVisible = true"
              >导入成绩数据</el-button
            > -->
          </el-col>
          <el-col :span="6" class="el-col-center el-col-size"
            ><span> 批量导入学生成绩信息 </span></el-col
          >
          <el-col :span="6" class="el-col-center"
            ><el-button type="primary" @click="sendGrade()"
              >添加成绩数据到后台</el-button
            ></el-col
          >
        </el-row>
      </div>

      <el-table
        :data="gradeinfo"
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
        <el-table-column align="center" label="学号" prop="student_no">
          <template slot-scope="scope">{{ scope.row.student_no }}</template>
        </el-table-column>
        <el-table-column label="课程编号" align="center">
          <template slot-scope="scope">{{ scope.row.course_no }}</template>
        </el-table-column>
        <el-table-column label="平时成绩" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.usual }}</span>
          </template>
        </el-table-column>
        <el-table-column label="期末成绩" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.end_of_term }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          align="center"
          prop="created_at"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              circle
              size="mini"
              @click="handleEdit(scope.row)"
              title="修改记录"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              title="删除记录"
            ></el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <el-dialog
        title="添加成绩"
        :visible.sync="dialogFormVisible"
        :append-to-body="true"
      >
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="学号" prop="student_no">
            <el-input v-model="form.student_no" />
          </el-form-item>
          <el-form-item label="课程编号" prop="course_no">
            <el-input v-model="form.course_no" />
          </el-form-item>
          <el-form-item label="平时成绩" prop="usual">
            <el-input v-model="form.usual" />
          </el-form-item>
          <el-form-item label="期末成绩" prop="end_of_term">
            <el-input v-model="form.end_of_term" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGrade(form)">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      gradeinfo: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      index: 0,
      form: {
        student_no: "",
        course_no: "",
        usual: "",
        end_of_term: "",
        remark: "",
      },
      // 返回数据列表
      sendlist: [], // 返回数据列表,
      rules: {},
    };
  },
  computed: {},
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
          this.gradeinfo = exl;
          console.log(this.gradeinfo);
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
    async sendGrade() {
      // this.sendlist.forEach(function (item) {
      //   list.push(item);
      // });

      var data = [...this.sendlist];
      //console.log(data);
      await this.$http
        .post("/api/cms/grade/1?_method=POST", data)
        .then((res) => {
          console.log(res);
        });
    },
    addGrade(form) {
      console.log(form);
      this.dialogFormVisible = false;
      this.list.gradeinfo.push({
        student_no: form.student_no,
        course_no: form.course_no,
        usual: form.usual,
        end_of_term: form.end_of_term,
        remark: form.remark,
      });
    },
    onSubmit() {
      // console.log(this.form);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.el-col-size {
  font-size: 25px;
  color: rgb(20, 235, 250);
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
  width: 70%;
  margin: 0 auto;
}
</style>

