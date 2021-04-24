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
          <el-button type="primary" @click="addDialogVisible = true"
            >添加学生</el-button
          >
          <el-button type="success" @click="exportExcel">导出数据</el-button>
          <el-button type="danger" @click="getStudentList()"
            >显示所有学生</el-button
          >

          <el-select
            v-model="value"
            filterable
            placeholder="请选择课程名称"
            style="margin: 0 15px"
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
      <el-table :data="gradeinfo" border stripe current-row-key>
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
      title="修改学生信息"
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
        <el-form-item label="姓名">
          <el-input v-model="editForm.student_name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editForm.student_no"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级号">
          <el-input v-model="editForm.class_no"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>

        <!-- <el-card class="box-card">
          <div v-for="item in options" :key="item.class_no" class="text item">
            {{ item.class_name + "---" + item.class_no }}
          </div>
        </el-card> -->
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
        <el-form-item label="姓名" prop>
          <el-input v-model="addForm.student_name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop>
          <el-input v-model="addForm.student_no"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop>
          <el-radio-group v-model="addForm.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop>
          <el-input v-model="addForm.class_no"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop>
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>

        <!-- <el-card class="box-card">
          <div v-for="item in options" :key="item.class_no" class="text item">
            {{ item.class_name + "---" + item.class_no }}
          </div>
        </el-card> -->
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
        gender: "",
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
          { required: true, message: "请输入9位数的学号", trigger: "blur" },
          {
            message: "请输入9位数的学号",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, trigger: "blur" }],
        class_no: [
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
          {
            required: true,
            message: "请输入学生姓名",
            trigger: "blur",
          },
          {
            message: "姓名的长度在1~6个字符之间",
            trigger: "blur",
          },
        ],
        student_no: [
          {
            required: true,
            message: "请输入10位数的学号",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, trigger: "blur" }],
        class_no: [
          {
            required: true,
            message: "请输入8位班级编号",
            trigger: "blur",
          },
        ],
        // remark: [{ required: true, message: "请选择备注", trigger: "blur" }],
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
    // 计算得0时设置为1
    // this.total = this.total == 0 ? 1 : this.total;
    // this.handleSizeChange();
  },

  created() {
    //this.getStudentList();
    this.getCourseName();
  },
  methods: {
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
      this.total = this.allgrade.length - 1;
      //每次点击更改页码值
      let begin = (this.pagenum - 1) * this.pagesize;
      let end = this.pagenum * this.pagesize;
      this.gradeinfo = this.allgrade.slice(begin, end);
    },
    // 获取班级
    async getDesignatedCourse(value) {
      console.log(value);
      value = value + "";
      let that = this;
      await this.$http
        .post(`/api/cms/grade/1?_method=GET&course_no=${value}`)
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
    exportExcel() {},
    async getCourseName() {
      await this.$http.post("/api/cms/curs/1?_method=GET").then((res) => {
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
      let that = this;
      await this.$http.post("/api/cms/grade/1?_method=GET").then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.allgrade = res.data.data;
          this.total = res.data.total;
        }
        let begin = (that.pagenum - 1) * that.pagesize;
        let end = that.pagenum * that.pagesize;
        that.gradeinfo = that.allgrade.slice(begin, end);
      });
      //   if (res.meta.status !== 200) {
      //     return this.$message.error("获取用户列表失败！");
      //   }
      //   console.log(res.data);
      //this.studentlist = res.data;
      //   this.total = res.data.total;
      //   console.log(res);
    },

    // 监听 switch 开关状态的改变
    async userStateChanged(userinfo) {
      console.log(userinfo);
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户状态失败！");
      }
      this.$message.success("更新用户状态成功！");
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加学生
    addStudent() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        console.log(this.addForm);
        this.$http
          .post("/api/cms/stu/1?_method=POST", [
            {
              student_name: this.addForm.student_name,
              student_no: this.addForm.student_no,
              class_no: this.addForm.class_no,
              gender: this.addForm.gender,
              remark: this.addForm.remark,
            },
          ])
          .then((res) => {
            if (res.status != 200) {
              // 提示修改失败
              return this.$message.error("更新学生信息失败！");
            }
            // 关闭对话框
            this.addDialogVisible = false;
            // 刷新数据列表
            this.getStudentList();
            // 提示修改成功
            this.$message.success("添加学生信息成功！");
          });
      });
    },
    // 删除学生
    removeStudent(id) {
      console.log(id);
      this.$http.post(`/api/cms/stu/1?_method=DELETE&id=${id}`).then((res) => {
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
    async showEditDialog(row) {
      this.editDialogVisible = true;
      var stu_no = row.student_no;

      await this.$http
        .post(`/api/cms/stu/1?_method=GET&student_no=${stu_no}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // this.editForm.student_no = res.data.data[0].student_no;
            // this.editForm.student_name = res.data.data[0].student_name;
            // this.editForm.gender = res.data.data[0].gender;
            this.editForm = res.data.data[0];
          }
          this.$set(this.editForm, "remark", "");
          this.$set(this.editForm, "class_no", "");
          // this.editForm.remark = "";
          // this.editForm.class_no = "";
          console.log(this.editForm);
        });
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
        //console.log(this.editForm);
        this.$http
          .post("/api/cms/stu/1?_method=POST", [
            {
              student_name: this.editForm.student_name,
              student_no: this.editForm.student_no,
              class_no: this.editForm.class_no,
              gender: this.editForm.gender,
              remark: this.editForm.remark,
            },
          ])
          .then((res) => {
            if (res.status != 200) {
              // 提示修改失败
              return this.$message.error("更新学生信息失败！");
            }
            // 关闭对话框
            this.editDialogVisible = false;
            // 刷新数据列表
            this.getStudentList();
            // 提示修改成功
            this.$message.success("更新学生信息成功！");
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
        .post(`/api/cms/grade/1?_method=GET&student_no=${value}`)
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
