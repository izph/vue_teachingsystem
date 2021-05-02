<template>
  <div>
    <!-- 面包屑导航区域 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/index' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>成绩信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生成绩列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            placeholder="请输入正确的学号搜索学生成绩"
            v-model="queryInfo.query"
            clearable
            @clear="clearStudentList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchStudentList(queryInfo.query)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="12">
          <!-- <el-button type="primary" @click="addDialogVisible = true"
            >添加学生</el-button
          > -->
          <el-button type="success" @click="outExcel()">导出数据</el-button>
          <el-button type="danger" @click="getStudentList()"
            >显示所有学生</el-button
          >

          <el-select
            v-model="value"
            filterable
            placeholder="请选择课程名称"
            style="margin: 0 15px"
            clearable
            @change="getDesignatedCourse(value)"
          >
            <el-option
              v-for="item in options"
              :key="item.course_no"
              :label="item.course_name"
              :value="item.course_no"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <!-- 成绩列表区域 -->
      <el-table :data="gradeinfo" border stripe current-row-key id="out-table">
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="70px"
        ></el-table-column>
        <el-table-column
          type="id"
          align="center"
          label="ID"
          prop="id"
          width="70px"
        ></el-table-column>
        <el-table-column
          sortable
          label="学生姓名"
          prop="student_name"
          align="center"
        ></el-table-column>
        <el-table-column
          sortable
          label="学号"
          prop="student_no"
          align="center"
        ></el-table-column>
        <el-table-column
          label="课程名称"
          prop="course_name"
          align="center"
          sortable
        ></el-table-column>

        <el-table-column label="平时成绩" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.usual }}</span>
          </template>
        </el-table-column>
        <el-table-column label="期末成绩" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.end_of_term }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="allgrade"
          label="综合成绩"
          sortable
        >
          <template slot-scope="scope">{{
            (scope.row.usual * 0.3 + scope.row.end_of_term * 0.7).toFixed(2)
          }}</template>
        </el-table-column>

        <el-table-column label="成绩等级" align="center">
          <!-- <template slot-scope="scope">
            <span>{{
              scope.row.usual * 0.3 + scope.row.end_of_term * 0.7 > 60
                ? "及格"
                : "不及格"
            }}</span>
          </template> -->

          <template slot-scope="scope">
            <el-tag
              :type="
                filterColor(scope.row.usual * 0.3 + scope.row.end_of_term * 0.7)
              "
              disable-transitions
              >{{
                (scope.row.usual * 0.3 + scope.row.end_of_term * 0.7)
                  | filterGrade
              }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="300px">
          <!-- <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template> -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="medium"
              @click="showEditDialog(scope.row)"
              >修改</el-button
            >
            <!-- 删除按钮 -->
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              style="margin: 0 15px"
              size="medium"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除当前学生记录吗？"
              @confirm="removeStudent(scope.row.id)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="medium"
                slot="reference"
                style="margin: 0 15px"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 20, 30, 50, 80, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改学生信息 -->
    <el-dialog
      title="修改学生成绩"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
      :append-to-body="true"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="student_name">
          <el-input v-model="editForm.student_name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="student_no">
          <el-input v-model="editForm.student_no"></el-input>
        </el-form-item>
        <el-form-item label="课程" prop="course_no">
          <el-select v-model="addForm.course_no" placeholder="请选择课程名称">
            <el-option
              v-for="item in options"
              :key="item.course_no"
              :label="item.course_name"
              :value="item.course_no"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平时" prop="usual">
          <el-input v-model="editForm.usual"></el-input>
        </el-form-item>
        <el-form-item label="期末" prop="end_of_term">
          <el-input v-model="editForm.end_of_term"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStudent">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加学生信息 -->
    <el-dialog
      title="添加学生"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
      :append-to-body="true"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="student_name">
          <el-input v-model="addForm.student_name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="student_no">
          <el-input v-model="addForm.student_no"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="course_no">
          <el-select v-model="addForm.course_no" placeholder="请选择课程名称">
            <el-option
              v-for="item in options"
              :key="item.course_no"
              :label="item.course_name"
              :value="item.course_no"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平时成绩" prop="usual">
          <el-input v-model="addForm.usual"></el-input>
        </el-form-item>
        <el-form-item label="期末成绩" prop="end_of_term">
          <el-input v-model="addForm.end_of_term"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addResetGrade">重置</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  filters: {
    filterGrade(grade) {
      if (grade >= 90) {
        return "优秀";
      } else if (grade >= 80 && grade < 90) {
        return "良好";
      } else if (grade >= 70 && grade < 80) {
        return "一般";
      } else if (grade >= 60 && grade < 70) {
        return "及格";
      } else {
        return "不及格";
      }
    },
  },
  data() {
    return {
      options: [],
      value: "",
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
      },
      // 当前的页数
      pagenum: 1,
      // 当前每页显示多少条数据
      pagesize: 10,
      total: 0,
      count: 0,
      // 当前页数据
      gradeinfo: [],
      // 后端返回的所有数据
      allgrade: [],

      designatedclass: [],
      // 班级总数
      courselist: [],
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        student_name: "",
        student_no: "",
        class_no: "",
        remark: "",
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
          { required: true, message: "请输入学生的学号", trigger: "blur" },
          {
            message: "请输入学生的学号",
            trigger: "blur",
          },
        ],
        end_of_term: [{ required: true, trigger: "blur" }],
        usual: [{ required: true, trigger: "blur" }],
        course_no: [
          { required: true, message: "请输入点名信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
        remark: [{ message: "请填写备注信息", trigger: "blur" }],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        student_name: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            message: "姓名的长度在1~6个字符之间",
            trigger: "blur",
          },
        ],
        student_no: [
          { required: true, message: "请输入学生的学号", trigger: "blur" },
          {
            message: "请输入学生的学号",
            trigger: "blur",
          },
        ],
        end_of_term: [{ required: true, trigger: "blur" }],
        usual: [{ required: true, trigger: "blur" }],
        course_no: [
          { required: true, message: "请输入点名信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
        remark: [{ message: "请填写备注信息", trigger: "blur" }],
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色Id值
      selectedRoleId: "",
    };
  },
  mounted() {
    // 计算一共有几页
    // this.total = Math.ceil(this.addStudent.length / this.pagesize);
    this.pageInation(this.pagenum, this.pagesize);
  },

  created() {
    //this.getStudentList();
    this.getCourseName();
    this.getClassName();
  },
  methods: {
    outExcel() {
      /* out-table关联导出的dom节点  */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `学生成绩信息.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    filterColor(grade) {
      if (grade >= 90) {
        return "primary";
      } else if (grade >= 80 && grade < 90) {
        return "success";
      } else if (grade >= 70 && grade < 80) {
        return "info";
      } else if (grade >= 60 && grade < 70) {
        return "warning";
      } else {
        return "danger";
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.pagesize = newSize;
      this.pagenum = 1;
      this.pageInation(this.pagenum, this.pagesize);
    },

    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.pageInation(this.pagenum, this.pagesize);
    },
    pageInation(pagenum, pagesize) {
      pagenum = pagenum ? pagenum : this.pagenum;
      pagesize = pagesize ? pagesize : this.pagesize;
      //console.log(this.allgrade.length - 1);
      this.total = this.allgrade.length;
      //每次点击更改页码值
      let begin = (this.pagenum - 1) * this.pagesize;
      let end = this.pagenum * this.pagesize;
      this.gradeinfo = this.allgrade.slice(begin, end);
    },
    // 获取班级
    async getClassName() {
      await this.$http
        .post("/cms/class/1?_method=GET&class_no=")
        .then((res) => {
          if (res.status === 200) {
            var list = res.data.data;
            var class_list = [];

            list.forEach(function (item, index) {
              class_list[index] = {};

              class_list[index].value = item.class_no;
              class_list[index].label = item.class_name;
            });
            this.classlist = class_list;
            console.log(this.classlist);
          }
        });
    },
    // 获取班级
    async getDesignatedCourse(value) {
      value = value + "";
      let that = this;
      await this.$http
        .post(`/cms/grade/1?_method=GET&course_no=${value}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.allgrade = res.data.data;

            this.total = res.data.total;
            // console.log(this.tableData);
          }
          let begin = (that.pagenum - 1) * that.pagesize;
          let end = that.pagenum * that.pagesize;
          that.gradeinfo = that.allgrade.slice(begin, end);

          this.pagenum = 1;
          this.pageInation(this.pagenum, this.pagesize);
        });
    },
    filterHandler(value, row, column) {
      return row.class_name === value;
    },

    async getCourseName() {
      await this.$http.post("/cms/curs/1?_method=GET").then((res) => {
        console.log(res);
        if (res.status === 200) {
          var list = res.data.data;
          var course_list = [];
          var course_options = [];
          list.forEach(function (item, index) {
            course_list[index] = {};
            course_options[index] = {};

            course_list[index].text = item.course_name;
            course_list[index].value = item.course_no;

            course_options[index].course_no = item.course_no;
            course_options[index].course_name = item.course_name;
          });
          this.courselist = course_list;
          this.options = course_options;
          console.log(this.courselist);
          console.log(this.options);
        }
      });
    },
    async getStudentList() {
      this.value = "";
      let that = this;
      await this.$http.post("/cms/grade/1?_method=GET").then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.allgrade = res.data.data;
          this.total = res.data.total;
        }
        let begin = (that.pagenum - 1) * that.pagesize;
        let end = that.pagenum * that.pagesize;
        that.gradeinfo = that.allgrade.slice(begin, end);
      });
    },

    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addResetGrade() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加学生
    addStudent() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        console.log(this.addForm);
        var coursenum = this.addForm.course_no;
        // this.$http
        //   .post("/api/cms/grade/1?_method=POST", [
        //     {
        //       student_no: this.addForm.student_no,
        //       course_no: this.addForm.course_no,
        //       usual: this.addForm.usual,
        //       end_of_term: this.addForm.end_of_term,
        //       remark: this.addForm.remark,
        //     },
        //   ])
        //   .then((res) => {
        //     if (res.status != 200) {
        //       // 提示修改失败
        //       return this.$message.error("添加学生成绩失败！");
        //     }
        //     // 关闭对话框
        //     this.editDialogVisible = false;
        //     // 刷新数据列表
        //     //this.getStudentList();
        //     // 提示修改成功
        //     this.$message.success("添加学生成绩成功！");
        //     this.getDesignatedCourse(coursenum);
        //   });
      });
    },
    // 删除学生
    removeStudent(id) {
      console.log(id);
      this.$http.post(`/cms/stu/1?_method=DELETE&id=${id}`).then((res) => {
        console.log(res);
        this.$message({
          message: "删除学生信息成功",
          type: "success",
        });

        // 重新获取用户列表数据
        this.getStudentList();
        this.pagenum = 1;
        this.pageInation(this.pagenum, this.pagesize);
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(row) {
      this.editDialogVisible = true;
      this.editForm = row;
      this.$set(this.editForm, "remark", "");

      // await this.$http
      //   .post(`/api/cms/stu/1?_method=GET&student_no=${stu_no}`)
      //   .then((res) => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       // this.editForm.student_no = res.data.data[0].student_no;
      //       // this.editForm.student_name = res.data.data[0].student_name;
      //       // this.editForm.gender = res.data.data[0].gender;
      //       this.editForm = res.data.data[0];
      //     }
      //     this.$set(this.editForm, "remark", "");
      //     // this.$set(this.editForm, "class_no", "");
      //     // this.editForm.course_no = row.course_no;
      //     this.editForm.usual = row.usual;
      //     this.editForm.end_of_term = row.end_of_term;
      //     console.log(this.editForm);
      //   });
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editStudent() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        // 发起修改学生信息的数据请求
        var coursenum = this.editForm.course_no;
        this.$http
          .post("/cms/grade/1?_method=POST", [
            {
              student_no: this.editForm.student_no,
              course_no: this.editForm.course_no,
              usual: this.editForm.usual,
              end_of_term: this.editForm.end_of_term,
              remark: this.editForm.remark,
            },
          ])
          .then((res) => {
            if (res.status != 200) {
              // 提示修改失败
              return this.$message.error("更新学生成绩失败！");
            }
            // 关闭对话框
            this.editDialogVisible = false;
            // 刷新数据列表
            //this.getStudentList();
            // 提示修改成功
            this.$message.success("更新学生成绩成功！");
            this.getDesignatedCourse(coursenum);
          });
      });
    },

    clearStudentList() {
      this.pageInation(this.pagenum, this.pagesize);
    },
    async searchStudentList(value) {
      console.log(value);
      //&course_no=
      await this.$http
        .post(`/cms/grade/1?_method=GET&student_no=${value}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.gradeinfo = res.data.data;
            this.total = res.data.total;
            // console.log(this.tableData);
          }
        });
      // this.studentlist = res.data;
      // this.queryInfo.total = res.data.length;
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  height: 50px;
  width: 400px;
  text-align: center;
}
.el-breadcrumb {
  margin: 20px 0 0 20px;
  font-size: 20px;
  vertical-align: center;
}
</style>
