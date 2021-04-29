<template>
  <div class="login-container">
    <div class="header">
      <div class="logo pull_left">
        <div class="logo-wrap">
          <img
            src="../../assets/hqulogo_05.png"
            alt="IDS logo"
            title="IDS logo"
            class="logo"
          />
          <i class="divideline"></i>
          <span class="title">教学管理系统</span>
        </div>
      </div>
    </div>
    <div class="main">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <span class="title">用户登录</span>
        </div>

        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="账号"
            name="username"
            type="text"
            prefix-icon="iconfont icon-user"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            @keyup.enter.native="handleLogin"
            prefix-icon="iconfont icon-3702mima"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 25px"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
        <!-- <el-button
          :loading="loading"
          type="success"
          style="width: 100%; margin: 0 0 25px 0 !important"
          @click="resetForm()"
          >重置</el-button
        > -->

        <div class="login_hint">
          <p>账号说明：00000001。</p>
          <p>密码说明：6LH60uSa。</p>
          <p>如尝试以上密码不能登录，请联系管理员。</p>
        </div>
      </el-form>
    </div>
    <div class="footer">
      <div class="copy">
        <p>
          <strong>
            版权所有
            <strong>
              <span style="color: #ccc">©</span>
            </strong>
            华侨大学数学科学学院
          </strong>
          <br />地址：福建省泉州市丰泽区城华北路269号 &nbsp;邮政编码：362000
          <br />
        </p>
      </div>
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
      loginForm: {
        username: "00000001",
        password: "123456",
      },
      loginRules: {
        username: [
          { validator: validUserName, trigger: "blur" },
          {
            min: 7,
            max: 12,
            message: "用户名长度在7-12个字符之间",
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
      loading: false,
      passwordType: "password",
    };
  },
  watch: {},
  methods: {
    resetForm() {
      this.$refs.loginForm.resetFields();
    },

    handleLogin() {
      // $refs获取页面中所有的设置了ref属性的标签
      this.$refs.loginForm.validate((valid) => {
        // console.log(valid);
        if (valid) {
          // this.loading = true;
          // this.$router.push("/admin/index");
          this.$http
            .post(
              `/api/cms/login/1?staffno=${this.loginForm.username}&password=${this.loginForm.password}`
            )
            //"/api/cms/login/3?staffno=00000001&password=6LH60uSa"     /api/MyWeb/getShopInfox.jsp
            .then((res) => {
              console.log(res);

              if (res.status && res.data.state === "true") {
                //执行成功
                // console.log(res.headers.token);
                sessionStorage.setItem("staff_no", this.loginForm.username); //保存在本地
                this.$cookies.set("token", res.headers.token);
                this.$cookies.set("JSESSIONID", res.headers.jsessionid);

                this.$message.success("登录成功!");
                this.$router.push(`/admin/index`);
                this.loading = false;
              }
            });
          // this.$http
          //   .post("/num/api/admin/login", {
          //     username: "李老师",
          //     password: "123456",
          //   })
          //   .then((res) => {
          //     if (res.data.status) {
          //       //执行成功
          //       // console.log(res.data.data);
          //       localStorage.setItem("token", res.data.data); //保存在本地
          //       this.$message.success("登录成功!");
          //       this.$router.push("/admin/index");
          //     }
          //   });
        } else {
          this.$message.error("error submit!!!!");
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" >
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    background: #fff;
  }
}
.logo {
  width: 330px;
  height: 80px;
  background-size: cover;
}
/* reset element-ui css */
.login-container {
  font-family: Arial, Helvetica, sans-serif;
  .header {
    height: 8rem;
    line-height: 8rem;
    margin: 0 auto;
    width: 75%;
    padding-top: 20px;
    .pull_left {
      float: left;
      .logo-wrap {
        width: 490px;
        height: 100px;
        line-height: 100px;
        img {
          float: left;
        }
        .divideline {
          width: 1px;
          height: 22px;
          background-color: #d9d9d9;
          float: left;
          margin: 30px 10px 15px 10px;
          font-style: italic;
        }
        .title {
          float: right;
          display: inline-block;
          height: 80px;
          line-height: 80px;
          font-size: 22px;
          font-weight: 700;
        }
      }
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 75%;

    input {
      background: transparent;
      white-space: nowrap;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
  }

  .el-form-item {
    border: 1px solid #dedede;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
.main {
  margin: 15px 0 0 0;
  min-height: 630px;
  width: 100%;
  // background: url(../../img/index_bg.png) no-repeat;
  background: url(../../assets/hqulogo02.jpg) no-repeat;
  background-size: 1;
  position: relative;
  .el-input__inner {
    margin-left: 20px;
    border: 1px solid #fff !important;
  }
}
.footer {
  font-size: 12px;
}
.footer .copy {
  border-top: 1px solid #dbdbdb;
  width: 75%;
  padding-top: 20px;
}
.footer .copy,
.footer .support {
  margin: 0 auto;
  text-align: center;
  color: #9a9a9a;
  line-height: 16px;
}
p {
  margin: 0;
  padding: 0;
}
strong,
b {
  font-weight: bold;
}
.login_hint {
  padding-bottom: 20px;
  padding-left: 10px;
  p {
    color: #75a2cfbe;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    /* position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden; */
    position: absolute;
    top: 90px;
    right: 100px;
    width: 320px;
    height: auto;
    background: #fff;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 1px 1px 1px #cdd4da;
    padding: 10px 40px;
    box-sizing: content-box;
  }

  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    text-align: center;
    height: 35px;
    padding: 15px;
    // border-bottom: 2px solid #720808;
    border-bottom: 2px solid #24d1f0;
    margin-bottom: 30px;

    .title {
      /* font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold; */
      font: bold 20px/40px "Microsoft YaHei";
    }
  }
}
</style>