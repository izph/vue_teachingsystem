<template>
  <div class="admin-user-info">
    <div class="title">
      <h1>个人信息修改</h1>
    </div>
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="user_name">
        <el-input
          type="text"
          v-model="userInfo.user_name"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="教工号" prop="staff_no">
        <el-input
          type="text"
          v-model="userInfo.staff_no"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确认修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminUserInfo",

  data() {
    let checkUserName = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入正确的用户名!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        user_name: sessionStorage.getItem("user_name"),
        staff_no: sessionStorage.getItem("staff_no"),
      },
      rules: {
        user_name: [
          { validator: checkUserName, trigger: "blur" },
          { min: 2, max: 8, message: "用户名在2-8个字符之间", trigger: "blur" },
        ],
        staff_no: [
          { validator: checkUserName, trigger: "blur" },
          { min: 6, max: 8, message: "教工号在6-8个数字之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put("/admin/update", this.userInfo).then((res) => {
            if (res.data.status) {
              this.$message.success(res.data.msg);
              this.$router.push("/admin/index");
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.admin-user-info {
  width: 500px;
  margin: 20px auto;
  .title {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 20px !important;
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
