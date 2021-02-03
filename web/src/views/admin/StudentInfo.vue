<template>
  <div>
    <!-- 面包屑导航区域 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>点名</el-breadcrumb-item>
      <el-breadcrumb-item>信息计算1班</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
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
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
          <el-button type="success" @click="exportExcel">导出数据</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="studentlist" border stripe current-row-key>
        <el-table-column
          type="index"
          align="center"
          label="序号"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="studyname"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学号"
          prop="studyno"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          label="性别"
          prop="sex"
          align="center"
        ></el-table-column>
        <el-table-column
          label="点名"
          prop="rollcall"
          align="center"
        ></el-table-column>
        <el-table-column
          label="抽查"
          prop="spotcheck"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
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
              size="mini"
              @click="showEditDialog(scope.row.studyno)"
              >修改</el-button
            >
            <!-- 删除按钮 -->
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除当前学生记录吗？"
              @confirm="removeStudent(scope.row.studyno)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180px" align="center">
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryInfo.total"
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
        <el-form-item label="姓名" prop="studyname">
          <el-input v-model="editForm.studyname"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studyno">
          <el-input v-model="editForm.studyno"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="editForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="点名" prop="rollcall">
          <el-input v-model="editForm.rollcall"></el-input>
        </el-form-item>

        <el-form-item label="抽查" prop="spotcheck">
          <el-input v-model="editForm.spotcheck"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStudent()">确 定</el-button>
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
        <el-form-item label="姓名" prop="studyname">
          <el-input v-model="addForm.studyname"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studyno">
          <el-input v-model="addForm.studyno"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="点名" prop="rollcall">
          <el-input v-model="addForm.rollcall"></el-input>
        </el-form-item>

        <el-form-item label="抽查" prop="spotcheck">
          <el-input v-model="addForm.spotcheck"></el-input>
        </el-form-item>
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
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
        total: 0,
      },
      studentlist: [],

      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        // studyname: "",
        // studyno: "",
        // sex: "",
        rollcall: "未点名",
        spotcheck: "未抽查",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        studyname: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            message: "姓名的长度在1~6个字符之间",
            trigger: "blur",
          },
        ],
        studyno: [
          { required: true, message: "请输入9位数的学号", trigger: "blur" },
          {
            min: 9,
            max: 9,
            message: "请输入9位数的学号",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, trigger: "blur" }],
        rollcall: [
          { required: true, message: "请输入点名信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
        spotcheck: [
          { required: true, message: "请输入抽查信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
      }, // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        studyname: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            message: "姓名的长度在1~6个字符之间",
            trigger: "blur",
          },
        ],
        studyno: [
          { required: true, message: "请输入9位数的学号", trigger: "blur" },
        ],
        sex: [{ required: true, trigger: "blur" }],
        rollcall: [
          { required: true, message: "请输入点名信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
        spotcheck: [
          { required: true, message: "请输入抽查信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
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
  created() {
    // this.getStudentList();
    this.pageInation(this.queryInfo.pagenum, this.queryInfo.pagesize);
  },
  methods: {
    async getStudentList() {
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:8888/api/admin/mystudent"
        // {
        //   params: this.queryInfo,
        // }
      );
      //   if (res.meta.status !== 200) {
      //     return this.$message.error("获取用户列表失败！");
      //   }
      //   console.log(res.data);
      this.studentlist = res.data;
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
        const { data: res } = await this.$http.post(
          "http://127.0.0.1:8888/api/admin/addmystudent",
          this.addForm
        );
        console.log(res);
        // if (res.meta.status !== 201) {
        //   this.$message.error("添加用户失败！");
        // }

        this.$message.success("添加用户成功！");
        // 隐藏添加用户的对话框
        this.addDialogVisible = false;
        // 重新获取用户列表数据
        this.getStudentList();
      });
    },
    // 删除学生
    removeStudent(studyno) {
      console.log(studyno);
      this.$http
        .delete(`http://127.0.0.1:8888/api/admin/removemystudent/${studyno}`)
        .then(() => {
          this.$message({
            message: "删除学生信息成功",
            type: "success",
          });
          // this.page.current = 1;
          // 重新获取用户列表数据
          this.getStudentList();
        });
    },
    // 展示编辑用户的对话框
    async showEditDialog(studyno) {
      console.log(studyno);
      const { data: res } = await this.$http.get(
        `http://127.0.0.1:8888/api/admin/getupdatemystudent/${studyno}`
      );

      //   if (res.meta.status !== 200) {
      //     return this.$message.error("查询用户信息失败！");
      //   }
      console.log(res);
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editStudent() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改学生信息的数据请求
        const { data: res } = await this.$http.put(
          `http://127.0.0.1:8888/api/admin/updatemystudent`,
          this.editForm
        );
        if (!res.status) {
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
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      //   console.log(newSize);

      this.queryInfo.pagesize = newSize;
      this.queryInfo.pagenum = 1;
      this.pageInation(this.queryInfo.pagenum, this.queryInfo.pagesize);
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      //   console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.pageInation(this.queryInfo.pagenum, this.queryInfo.pagesize);
    },
    // 分页信息
    async pageInation(pagenum, pagesize) {
      pagenum = pagenum ? pagenum : this.queryInfo.pagenum;
      pagesize = pagesize ? pagesize : this.queryInfo.pagesize;
      let that = this;
      //每次点击更改页码值
      console.log(pagenum);
      console.log(pagesize);
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:8888/api/admin/studentListPage?currentPage=" +
          pagenum +
          "&pageSize=" +
          pagesize
      );
      // .then((res) => {
      //   if (res.data.data == null || res.data.data.length == 0) {
      //     //除第一页的其他某页全都删除了的情况：
      //     that.page.current = that.page.current - 1;
      //     that.pageInation();
      //   } else {
      //     that.studentList = res.data.data;
      //     that.queryInfo.total = res.data.total;
      //   }
      // });
      console.log(res);
      this.studentlist = res.data.data;
      this.queryInfo.total = res.data.total;
    },
    clearStudentList() {
      this.pageInation(this.queryInfo.pagenum, this.queryInfo.pagesize);
    },
    async searchStudentList(query) {
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:8888/api/admin/searchstudentList?currentquery=" +
          query
      );
      console.log(res);
      this.studentlist = res.data;
      this.queryInfo.total = res.data.length;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
