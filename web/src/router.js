// 配置路由相关的信息
import Vue from "vue";
import Router from "vue-router";

// vue.use(插件) ，安装插件
// const routes=[]
// const router=new Router({routes})
Vue.use(Router);

const router = new Router({


  //"mode": "history",
  mode: 'hash',
  base: '/dist',

  routes: [
    // 一个映射就是一个对象
    {
      path: "/",
      // redirect: "/student/login"
      redirect: "/admin/login",
    },
    {
      path: "/admin/login",
      name: "AdminLogin",
      component: () => import("./views/admin/AdminLogin.vue"),
    },
    {
      path: "/admin/index",
      name: "AdminIndex",
      component: () => import("./views/admin/AdminIndex.vue"),
      meta: { identity: "admin" },
      children: [
        {
          path: "/admin/index",
          name: "Home",
          component: () => import("./views/admin/AdminHome.vue"),
          meta: {
            identity: "admin",
          },

        },
        {
          path: "/admin/info",
          name: "AdminUserInfo",
          component: () => import("./views/admin/AdminUserInfo.vue"),
          meta: { identity: "admin" },
        },

        {
          path: "/admin/change/pw",
          name: "ChangeAdminPw",
          component: () => import("./views/admin/ChangeAdminPw.vue"),
          meta: { identity: "admin" },
        },

        {
          path: "/admin/course/details",
          name: "CourseDetails",
          component: () => import("./views/course/CourseDetails.vue"),
          meta: {
            identity: "admin",
          },
        },
        {
          path: "/admin/course/list",
          name: "CourseLsit",
          component: () => import("./views/course/CourseList.vue"),
          meta: {
            identity: "admin",
          },
        },
        {
          path: "/admin/course/attendence",
          name: "CourseAttendence",
          component: () => import("./views/course/courseAttendence.vue"),
          meta: {
            identity: "admin",
          },
        },
        {
          path: "/admin/course/inspection",
          name: "CourseInspection",
          component: () => import("./views/course/courseInspection.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/course/add",
          name: "AddCourse",
          component: () => import("./views/course/AddCourse.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/class/info",
          name: "ClassInfo",
          component: () => import("./views/class/ClassInfo.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/class/classdetails/:class_no",
          name: "ClassDetails",
          component: () => import("./views/class/classdetailed.vue"),
        },
        {
          path: "/admin/class/attendence/:student_no",
          name: "Attendence",
          component: () => import("./views/class/classattendence.vue"),
        },
        {
          path: "/admin/class/inspection/:student_no",
          name: "Inspection",
          component: () => import("./views/class/classinspection.vue"),
        },

        // {
        //   path: "/admin/class/add",
        //   name: "AddClass",
        //   component: () => import("./views/class/AddClass.vue"),
        //   meta: { identity: "admin" }
        // },
        {
          path: "/admin/user/info",
          name: "UserInfo",
          component: () => import("./views/user/UserInfo.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/user/add",
          name: "AddUser",
          component: () => import("./views/user/AddUser.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/user/allinfo",
          name: "UserAllInfo",
          component: () => import("./views/user/UserAllInfo.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/student/list",
          name: "StudentInfo",
          component: () => import("./views/student/StudentList.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/student/add",
          name: "AddStudent",
          component: () => import("./views/student/AddStudent.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/grade/info",
          name: "GradeInfo",
          component: () => import("./views/grade/GradeInfo.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/grade/add",
          name: "AddGrade",
          component: () => import("./views/grade/AddGrade.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/coursetime/time",
          name: "CourseTime",
          component: () => import("./views/coursetime/CourseTime.vue"),
          meta: { identity: "admin" },
        },
        {
          path: "/admin/coursetime/add",
          name: "AddCourseTime",
          component: () => import("./views/coursetime/AddCourseTime.vue"),
          meta: { identity: "admin" },
        },


      ],
    },

    {
      path: "/student/login",
      name: "StudentLogin",
      component: () => import("./views/student/StudentLogin"),
    },
    {
      path: "/student/index",
      name: "StudentIndex",
      component: () => import("./views/student/StudentIndex"),
      meta: { identity: "student" },
      children: [
        {
          path: "/student/info",
          name: "StudentInfo",
          component: () => import("./views/student/StudentInfo"),
          meta: { identity: "student" },
        },
        {
          path: "/student/index",
          name: "StudentHome",
          component: () => import("./views/student/StudentHome"),
          meta: { identity: "student" },
        },
        {
          path: "/student/change/password",
          name: "StudentChangePassword",
          component: () => import("./views/student/StudentChangPassword"),
          meta: { identity: "student" },
        },
        {
          path: "/student/update/info",
          name: "StudentUpdateInfo",
          component: () => import("./views/student/StudentUpdateInfo"),
          meta: { identity: "student" },
        },
      ],
    },
    {
      path: "*",
      name: "NotFound",
      component: () => import("./views/admin/NotFound.vue"),
    },
  ],
});

//vue.js前置守卫
router.beforeEach((to, from, next) => {
  // if (!localStorage.getItem("token") && (to.meta.identity === "admin" || to.meta.identity === "student")) {
  //   switch (to.meta.identity) {
  //     case "admin":
  //       return next("/admin/login");
  //     case "student":
  //       return next("/student/login");
  //   }
  // }
  next();
});

export default router;
