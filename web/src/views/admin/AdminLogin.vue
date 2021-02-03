<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/xiaoxiong.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="userInfo"
        :model="userInfo"
        :rules="rules"
        label-width="0px"
        class="userInfo"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="userInfo.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="userInfo.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('userInfo')"
            >登录</el-button
          >
          <el-button type="info" @click="resetForm('userInfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    //校验用户名;
    let validUserName = (rule, value, callback) => {
      if (value.trim() === "" || value.trim().length === 0) {
        callback(new Error("用户名不能为空!"));
      } else {
        callback();
      }
    };
    //校验密码;
    let validPassword = (rule, value, callback) => {
      if (value.trim() === "" || value.trim().length === 0) {
        callback(new Error("密码不能为空!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        username: "李老师",
        password: "123456",
      },
      rules: {
        username: [
          { validator: validUserName, trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "用户名长度在2-8个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { validator: validPassword, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在6-16个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //通过验证
          this.$http.post("/admin/login", this.userInfo).then((res) => {
            if (res.data.status) {
              //执行成功
              localStorage.setItem("token", res.data.data); //保存在本地
              this.$message.success("登录成功!");
              this.$router.push("/admin/index");
            }
          });
        }
      });
    },
    resetForm(forName) {
      this.$refs[forName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.login_container {
  background-color: #ccc;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.userInfo {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
