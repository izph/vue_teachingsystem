<template>
  <div class="app-container">
    <el-card>
      <h2 class="add-title">添加用户信息</h2>

      <el-form
        class="add-form"
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="form.user_name" />
        </el-form-item>
        <el-form-item label="教工号" prop="staff_no">
          <el-input v-model="form.staff_no" />
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input v-model="form.passwd" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" />
        </el-form-item>
        <!-- <el-form-item label="备注">
        <el-select v-model="form.remark" placeholder="备注" style="width: 100%">
          <el-option
            v-for="item in remarkInfo"
            :key="item.id"
            :label="item.remark"
            :value="item.remark"
          ></el-option>
        </el-select>
      </el-form-item> -->
        <center>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </center>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remarkInfo: [
        { id: 1, remark: "admin" },
        { id: 2, remark: "test" },
        { id: 3, remark: "null" },
      ], // 学院信息
      form: {
        user_name: "",
        staff_no: "",
        passwd: "",
        remark: "",
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        staff_no: [
          { required: true, message: "请输入教工号", trigger: "blur" },
        ],
        passwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {},
  created() {},
  methods: {
    // 获取学院列表
    getDepartmentList() {},
    async onSubmit() {
      var remark = sessionStorage.getItem("remark");
      if (remark == "admin") {
        await this.$http
          .post("/api/cms/user/1?_method=POST", [
            {
              user_name: this.form.user_name,
              staff_no: this.form.staff_no,
              passwd: this.form.passwd,
              remark: this.form.remark,
            },
          ])
          .then((res) => {
            if (res.data.update === 1) {
              this.$message.success("添加成功!");
              this.$refs["form"].resetFields();
            } else {
              this.$message("添加失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "非管理员禁止添加用户信息！",
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.add-title {
  text-align: center;
  color: black;
  font-size: 30px;
  margin-bottom: 20px;
}
.app-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 100px auto;
  width: 50%;
}
.addform-button {
  text-align: center;
}
</style>