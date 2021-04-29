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
                  <i class="el-icon-s-unfold"></i>
                  用户信息详情
                </el-menu-item>
                <el-menu-item index="/admin/user/add">
                  <i class="el-icon-s-unfold"></i>
                  添加用户信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title"
                ><i class="el-icon-s-custom"></i>学生信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/student/list">
                  <i class="el-icon-s-unfold"></i>
                  学生信息列表
                </el-menu-item>
                <el-menu-item index="/admin/student/add">
                  <i class="el-icon-s-unfold"></i>
                  添加学生信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title"
                ><i class="el-icon-s-platform"></i>成绩信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/grade/info">
                  <i class="el-icon-s-unfold"></i>
                  学生成绩列表
                </el-menu-item>
                <el-menu-item index="/admin/grade/add">
                  <i class="el-icon-s-unfold"></i>
                  批量添加成绩
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="6">
              <template slot="title"
                ><i class="el-icon-s-order"></i>课程信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/course/list">
                  <i class="el-icon-s-unfold"></i>
                  课程列表
                </el-menu-item>
                <el-menu-item index="/admin/course/add">
                  <i class="el-icon-s-unfold"></i>
                  添加课程
                </el-menu-item>
                <el-menu-item index="/admin/course/details">
                  <i class="el-icon-s-unfold"></i>
                  课程详情
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
                <!-- <el-menu-item index="/admin/coursetime/time">
                  <i class="el-icon-menu"></i>
                  上课时间列表
                </el-menu-item> -->
                <el-menu-item index="/admin/coursetime/add">
                  <i class="el-icon-s-unfold"></i>
                  添加上课时间
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="8">
              <template slot="title"
                ><i class="el-icon-s-data"></i>班级信息管理</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="/admin/class/info">
                  <i class="el-icon-s-unfold"></i>
                  班级信息列表
                </el-menu-item>
                <el-menu-item index="/admin/class/add">
                  <i class="el-icon-s-unfold"></i>
                  添加班级信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="9">
              <template slot="title"
                ><i class="el-icon-s-tools"></i>抽查信息管理</template
              >

              <el-menu-item-group>
                <el-menu-item index="/admin/inspection/info">
                  <i class="el-icon-s-unfold"></i>
                  学生抽查信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="10">
              <template slot="title"
                ><i class="el-icon-s-promotion"></i>出勤信息管理</template
              >

              <el-menu-item-group>
                <el-menu-item index="/admin/attendance/info">
                  <i class="el-icon-s-unfold"></i>
                  学生出勤信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="layui-body">
        <router-view
          :userInfo="userInfo"
          :key="$route.path"
          :classlist="classlist"
        />

        <!-- 回到顶部代码 -->
        <el-backtop target=".layui-body" :bottom="100">
          <div
            style="
               {
                height: 40px;
                width: 40px;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              }
            "
          >
            <i class="el-icon-upload2"></i>
          </div>
        </el-backtop>
      </div>
      <div class="layui-footer" style="text-align: center">
        Copyright © 2020-2021 17信计项目小组
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
      classlist: [],
    };
  },
  mounted() {
    //this.getCourseList();
    // console.log(data);
    // this.getdataList();
  },
  methods: {
    async getUserRemark() {
      var sta_no = sessionStorage.getItem("staff_no");
      console.log(sta_no);
      await this.$http.post("/api/cms/user/1?_method=GET").then((res) => {
        var userdata = res.data.data;
        var useritem = userdata.filter(function (item) {
          return item.staff_no == sta_no;
        });

        sessionStorage.setItem("remark", useritem[0].remark);
      });
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
    async getClassName() {
      await this.$http
        .post("/api/cms/class/1?_method=GET&class_no=")
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
  },
  created() {
    this.fetchUserInfo();
    this.getClassName();
    this.getUserRemark();
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