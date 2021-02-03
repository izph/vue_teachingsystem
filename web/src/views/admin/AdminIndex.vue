<template>
  <div class="index-container">
    <div class="layui-layout layui-layout-admin">
      <div class="layui-header">
        <el-button type="info" @click="logout">退出</el-button>
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
                :src="userInfo.avatar"
                class="layui-nav-img"
                style="width: 40px; height: 40px"
              />
              <el-dropdown class="user-text" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ userInfo.username
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
      <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
          <el-menu
            background-color="#23262E"
            text-color="#eee"
            active-text-color="#66ccff"
            router
          >
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-menu"></i>2019-2020第1学期</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/building/info"
                  >楼栋管理</el-menu-item
                >
                <el-menu-item index="/admin/housemaster/management"
                  >宿管管理</el-menu-item
                >
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item
                  index="/admin/student/info"
                  v-for="item in courselist"
                  :key="item.id"
                  >{{ item.coursename + item.grade }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-menu"></i>2019-2020第2学期</template
              >
              <!-- <el-menu-item-group>
                <el-menu-item index="/admin/change/pw">修改密码</el-menu-item>
                <el-menu-item index="/admin/info">修改资料</el-menu-item>
              </el-menu-item-group> -->
              <el-menu-item-group>
                <el-menu-item index="">高等代数</el-menu-item>
                <el-menu-item index="">线性代数</el-menu-item>
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
        username: "",
        avatar: "",
        password: null,
      },
      courselist: {},
    };
  },
  mounted() {
    this.getCourseList();
  },
  methods: {
    // 获取所有的菜单
    async getCourseList() {
      //   console.log("hahahahah");
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:8888/api/admin/course"
      );
      //   console.log(res.data);
      this.courselist = res.data;
    },
    logout() {
      localStorage.removeItem("token"); //清除token
      this.$router.push("/admin/login"); //跳转到登录界面
    },
    handleCommand(command) {
      if (command === "personInfo") {
        //个人信息
        this.$router.push("/admin/info");
      } else if (command === "logout") {
        //退出登录
        localStorage.removeItem("token"); //清除token
        this.$router.push("/admin/login"); //跳转到登录界面
      } else if (command === "changeadminpassword") {
        //修改密码
        this.$router.push("/admin/change/pw"); //跳转到修改密码界面
      }
    },
    //请求当前用户信息
    fetchUserInfo() {
      this.$http.get("/admin/").then((res) => {
        if (res.data.status) {
          this.userInfo = res.data.data;
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
  background-color: #009688 !important;
  color: white !important;
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

.el-button {
  margin-top: 10px;
  margin-left: 20px;
}
</style>