<template>
  <div class="index-container">
    <div class="layui-layout layui-layout-admin">
      <div class="layui-header">
        <el-button type="prma" @click="logout">退出</el-button>
        <router-link
          tag="div"
          class="layui-logo teachingsystem"
          to="/admin/index"
          >教学管理系统
        </router-link>
        <ul class="layui-nav layui-layout-right">
          <li class="layui-nav-item">
            <a href="javascript:;">
              <img
                src="../../assets/teacher.jpeg"
                class="layui-nav-img"
                style="width: 40px; height: 40px"
              />
              <el-dropdown
                class="user-text"
                @command="handleCommand"
                :userInfo="userInfo"
              >
                <span class="el-dropdown-link">
                  {{ userInfo.user_name
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="personInfo"
                    >个人信息</el-dropdown-item
                  >

                  <el-dropdown-item command="changeadminpassword"
                    >修改密码</el-dropdown-item
                  >
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </a>
          </li>
        </ul>
      </div>
      <div class="layui-side layui-bgc">
        <div class="layui-side-scroll">
          <el-menu
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#66ccff"
            router
          >
            <!-- <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-menu"></i>第二学期</template
              >
              
              <el-menu-item-group>
                <el-menu-item
                  index="/admin/student/info"
                  v-for="item in courselist"
                  :key="item.id"
                  >{{ item.coursename + item.grade }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu> -->

            <!-- <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-menu"></i>第一学期</template
              >
              
              <el-menu-item-group>
                <el-menu-item index="/admin/course/info">
                  班级信息
                </el-menu-item>
                <el-menu-item index="/admin/course/info"> 点名 </el-menu-item>
                <el-menu-item index="/admin/course/info"> 抽查 </el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->

            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-s-custom"></i>用户信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/user/info">
                  <i class="el-icon-menu"></i>
                  用户信息详情
                </el-menu-item>
                <el-menu-item index="/admin/user/add">
                  <i class="el-icon-menu"></i>
                  添加用户信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title"
                ><i class="el-icon-s-promotion"></i>学生信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/student/list">
                  <i class="el-icon-menu"></i>
                  学生信息列表
                </el-menu-item>
                <el-menu-item index="/admin/student/add">
                  <i class="el-icon-menu"></i>
                  添加学生信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title"
                ><i class="el-icon-menu"></i>成绩信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/grade/info">
                  <i class="el-icon-menu"></i>
                  学生成绩列表
                </el-menu-item>
                <el-menu-item index="/admin/grade/add">
                  <i class="el-icon-menu"></i>
                  添加成绩信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="6">
              <template slot="title"
                ><i class="el-icon-menu"></i>课程信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/course/list">
                  <i class="el-icon-menu"></i>
                  课程信息列表
                </el-menu-item>
                <el-menu-item index="/admin/course/add">
                  <i class="el-icon-menu"></i>
                  添加课程信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="7">
              <template slot="title"
                ><i class="el-icon-menu"></i>上课时间管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/coursetime/time">
                  <i class="el-icon-menu"></i>
                  上课时间列表
                </el-menu-item>
                <el-menu-item index="/admin/coursetime/add">
                  <i class="el-icon-menu"></i>
                  添加上课时间
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="8">
              <template slot="title"
                ><i class="el-icon-menu"></i>班级信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/class/info">
                  <i class="el-icon-menu"></i>
                  班级信息列表
                </el-menu-item>
                <el-menu-item index="/admin/class/add">
                  <i class="el-icon-menu"></i>
                  添加班级信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="9">
              <template slot="title"
                ><i class="el-icon-menu"></i>抽查信息管理</template
              >

              <el-menu-item-group>
                <el-menu-item index="/admin/inspection/info">
                  <i class="el-icon-menu"></i>
                  学生抽查信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="10">
              <template slot="title"
                ><i class="el-icon-menu"></i>出勤信息管理</template
              >

              <el-menu-item-group>
                <el-menu-item index="/admin/attendance/info">
                  <i class="el-icon-menu"></i>
                  学生出勤信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="layui-body">
        <router-view :userInfo="userInfo" :key="$route.path" />
      </div>
      <div class="layui-footer" style="text-align: center">
        Copyright © 2019-2021 项目小组
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminIndex",
  data() {
    return {
      userInfo: {
        id: "",
        user_name: sessionStorage.getItem("user_name"),
        staff_no: sessionStorage.getItem("staff_no"),
      },
      userlist: [],
      userstaffno: "",
    };
  },
  mounted() {
    //this.getCourseList();
    // console.log(data);
    // this.getdataList();
  },
  methods: {
    async getdataList() {
      //   console.log("hahahahah");
      // const { data: res } = await this.$http.get(
      //   "http://127.0.0.1:8888/api/admin/user/userinfo"
      // );
      // console.log(data.demoLis);
      // console.log(res.data);
      // this.coursedatalist = res.data.data;
    },
    logout() {
      //localStorage.removeItem("token"); //清除token
      this.$router.push("/admin/login"); //跳转到登录界面
    },
    handleCommand(command) {
      if (command === "personInfo") {
        //个人信息
        this.$router.push({
          //"/admin/info",
          name: "AdminUserInfo",
          params: {
            userInfo: this.userInfo,
          },
        });
      } else if (command === "logout") {
        //退出登录
        // localStorage.removeItem("token"); //清除token
        this.$router.push("/admin/login"); //跳转到登录界面
      } else if (command === "changeadminpassword") {
        //修改密码
        this.$router.push("/admin/change/pw"); //跳转到修改密码界面
      }
    },

    //请求当前用户信息
    async fetchUserInfo() {
      var users = sessionStorage.getItem("staff_no");
      await this.$http.post("/api/cms/user/1?_method=GET").then((res) => {
        if (res.status === 200) {
          this.userlist = res.data;
          this.userInfo = this.userlist.data.filter(function (item) {
            return item.staff_no == users;
          })[0];
          // this.$store.state.user = this.userInfo;
          sessionStorage.setItem("user_name", this.userInfo.user_name); //保存在本地
          //sessionStorage.setItem("staff_no", this.userInfo.staff_no); //保存在本地
          // console.log(sessionStorage.getItem("staff_no"));
          // console.log(sessionStorage.getItem("user_name"));
        }
      });
    },
  },
  created() {
    this.fetchUserInfo();
  },
};
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}

.el-icon-arrow-down {
  // margin-right: 10px !important;
  font-size: 12px;
}
.teachingsystem {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  color: #ffffff;
  font-size: 25px;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #001528 !important;
  // color: white !important;
}
.user-text {
  color: rgba(255, 255, 255, 0.8) !important;
  span,
  img {
    &:hover {
      color: white !important;
    }
  }
}
.layui-header {
  background-color: #304156;
}
.layui-side-scroll {
  .el-menu-item {
  }
}
.el-submenu {
  padding: 0 20px 0 0 !important;
  i {
    margin-right: 10px;
  }
}

.el-button {
  margin-top: 10px;
  margin-left: 20px;
}
.layui-bgc {
  background-color: #304156;
}
</style>