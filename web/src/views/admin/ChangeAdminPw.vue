<template>
  <div class="chang-pw">
    <div class="title">
      <h1>个人密码修改</h1>
    </div>
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="新密码" prop="passwd">
        <el-input
          type="password"
          v-model="userInfo.passwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="checkPass">
        <el-input
          type="password"
          v-model="userInfo.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >更新</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // props:["userInfo"],

  name: "ChangeAdminPw",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {},
      rules: {
        passwd: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码的长度在6-18个字符!",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交修改密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.userInfo.passwd);
          this.$http
            .post("/cms/user/1?_method=POST", [
              {
                user_name: sessionStorage.getItem("user_name"),
                staff_no: sessionStorage.getItem("staff_no"),
                passwd: this.userInfo.passwd,
              },
            ])
            .then((res) => {
              console.log(res);
              if (res.status == 200 && res.data.update === 1) {
                this.$message.success("修改密码成功!");
                this.$refs[formName].resetFields();
              } else {
                this.$message("修改密码失败!");
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.chang-pw {
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
</style>