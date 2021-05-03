<template>
  <div class="user-contain">
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="24">
        <el-col :span="4"
          ><div class="grid-content bg-purple">&nbsp;</div></el-col
        >
        <el-col :span="16" class="el-col-center"
          ><span> 用户信息管理中心 </span></el-col
        >
        <el-col :span="4">
          <el-button
            type="primary"
            @click="addUserInfo"
            style="margin-left: 120px"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="user-table"
        stripe
        current-row-key
        :cell-style="cellStyle"
        @cell-dblclick="handleCelldblclick"
      >
        <el-table-column type="index" width="80" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="用户名"
          width="180"
          align="center"
        >
          <!-- class-name="class_user_name" -->
          <template slot-scope="scope">
            <el-form :model="scope.row">
              <el-form-item size="mini">
                <el-input
                  v-if="scope.row.isOK"
                  v-model="scope.row.user_name"
                  style="width: 100%; hight: 100%"
                ></el-input>
                <span v-else>{{ scope.row.user_name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="staff_no" label="教工号" align="center">
        </el-table-column>
        <!-- <el-table-column prop="passwd" label="密码" align="center">
        </el-table-column> -->
        <el-table-column prop="remark" label="备注" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.remark === 'admin' ? 'parmiy' : 'info'"
              disable-transitions
              >{{ scope.row.remark == "admin" ? "管理员" : "普通用户" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作用户信息" align="center">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="small"
              style="margin: 0 15px"
              @click="showEditDialog(scope.row)"
              >修改</el-button
            >
            <!-- 删除按钮 -->
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除当前用户记录吗？"
              style="margin: 0 15px"
              @confirm="removeUserInfo(scope.row.id)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                slot="reference"
                >删除</el-button
              >
            </el-popconfirm>

            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定查看用户个人信息吗？"
              style="margin: 0 15px"
              @confirm="toUserInfo(scope.row)"
            >
              <el-button
                type="success"
                icon="el-icon-s-custom"
                size="small"
                slot="reference"
                >查看用户授课信息</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 
        
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryInfo.total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改用户信息 -->
    <el-dialog
      title="修改用户信息"
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
        <el-form-item label="用户名" prop="user_name">
          <el-input type="text" v-model="editForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="教工号" prop="staff_no">
          <el-input type="text" v-model="editForm.staff_no" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input type="text" v-model="editForm.passwd"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input type="text" v-model="editForm.remark" disabled></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {
        user_name: "",
        // staff_no: "",
        passwd: "",
        remark: "",
      },
      // 修改表单的验证规则对象
      editFormRules: {
        user_name: [
          {
            min: 2,
            max: 6,
            required: true,
            message: "请输入2-6个字符的用户姓名",
            trigger: "blur",
          },
        ],
        passwd: [
          {
            required: true,
            message: "请输入要修改的用户密码",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
      tableData: [],
      // 当前的页数
      currentPage: 1,
      // 当前每页显示多少条数据
      pagesize: 5,
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        total: 0,
      },

      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,

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
  methods: {
    // 双击
    handleCelldblclick(row, column, cell, event) {
      console.log(row); // id: 1  staff_no: "00000001"  user_name: "王利"

      row.isOK = !row.isOK;

      if (row.isOK === false) {
        // 双击修改用户名
        console.log(1);
      }
      // this.$http
      //   .post("/api/cms/user/1?_method=POST", [
      //     {
      //       user_name: this.form.user_name,
      //       staff_no: this.form.staff_no,
      //       passwd: this.form.passwd,
      //       remark: this.form.remark,
      //     },
      //   ])
      //   .then((res) => {
      //     if (res.data.update === 1) {
      //       this.$message.success("添加成功!");
      //       this.$refs["form"].resetFields();
      //     } else {
      //       this.$message("添加失败");
      //     }
      //   });
    },
    //第三列  用户名设置为小手
    cellStyle(data) {
      if (data.columnIndex === 2) {
        return "cursor:pointer;";
      }
    },

    clearuserList() {},
    exportExcel() {},
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    addUserInfo() {
      this.$router.push("/admin/user/add");
    },
    toUserInfo(row) {
      sessionStorage.setItem("userrow", JSON.stringify(row));
      this.$router.push({
        name: "UserAllInfo",
      });
    },
    async editUser() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        console.log(this.editForm);
        this.$http
          .post("/cms/user/1?_method=POST", [
            {
              user_name: this.editForm.user_name,
              staff_no: this.editForm.staff_no,
              passwd: this.editForm.passwd,
              remark: this.editForm.remark,
            },
          ])
          .then((res) => {
            //console.log(res);
            if (!res.status) {
              this.$message("更新用户失败！");
            }
            // 关闭对话框
            this.editDialogVisible = false;
            // 刷新数据列表
            this.getUserInfo();
            // 提示修改成功
            this.$message.success("更新用户信息成功！");
          });
      });
    },
    showEditDialog(row) {
      var remark = sessionStorage.getItem("remark");
      var sta_no = sessionStorage.getItem("staff_no");
      if (remark == "admin" || sta_no == row.staff_no) {
        this.editDialogVisible = true;
        this.editForm.user_name = row.user_name;
        this.editForm.staff_no = row.staff_no;
        this.editForm.remark = row.remark;
      } else {
        this.$message.error("非管理员禁止修改其他用户信息！");
      }
    },
    async removeUserInfo(id) {
      var remark = sessionStorage.getItem("remark");

      if (remark == "admin") {
        //console.log(id);
        await this.$http
          .post(`/cms/user/1?_method=DELETE&id=${id}`)
          .then((res) => {
            //console.log(res);
            if (res.status === 200) {
              this.getUserInfo();
            }
          });
      } else {
        this.$message.error("非管理员禁止删除用户信息！");
      }
    },
    async getUserInfo() {
      await this.$http.post("/cms/user/1?_method=GET").then((res) => {
        console.log(res);
        if (res.status === 200) {
          var datalist = [];
          datalist = res.data.data;
          this.queryInfo.total = res.data.total;
          datalist.forEach(function (item) {
            item.isOK = false;
          });
          this.tableData = datalist;
          //console.log(this.tableData);
        }
      });
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.el-col-center {
  font-size: 25px;
  text-align: center;

  -webkit-text-stroke: 1px #409eff;
  -webkit-text-fill-color: transparent;
}
.user-contain {
  height: 100%;
}
.user-table {
}
.class_user_name {
  cursor: pointer;
  color: aqua;
}
</style>