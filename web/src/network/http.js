import Vue from "vue";
import axios from "axios";

import { Loading, Message } from 'element-ui';
import router from "../router";
import { getCookie, setCookie, removeCookie } from "./util.js";

let loading;
//请求加载动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0,0,0,0.7)"
  });
}
//结束加载动画
function endLoading() {
  loading.close();
}
// const baseURL = '/api'
let http = axios.create({
  //baseURL: "http://47.94.225.225"
  // baseURL: baseURL,
  withCredentials: true,
  // credentials: 'include'
  // timeout: 5000

});


// 设置axios请求的token
//axios.defaults.headers.token = '4377e2117cea49fab62fed587b984dd3'
//设置请求头




//请求拦截器
http.interceptors.request.use(config => {
  startLoading();
  // config.headers.token = localStorage.getItem("token");
  //console.log(config.headers.token)
  //config.headers.Accept = "text/html,application/json";
  return config;
}, error => {
  return Promise.reject(error);
});

// axios.interceptors.request.use(config => {
//   startLoading();
//   // config.headers.token = getCookie('token');
//   // console.log(config.headers.token)
//   config.headers["Content-Type"] = "multipart/form-data";
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

//响应拦截器
http.interceptors.response.use(res => {
  endLoading();//结束加载动画
  //统一错误处理

  if (!res.status) {
    Message({
      message: '错误！',
      type: "error"
    });
  }
  return res;
}, error => {
  endLoading();//结束加载动画
  console.log(error)
  if (error.response.status === 401 && error.response.data.data.user === "admin") {
    Message.error("请先登录!");
    //清除token
    localStorage.removeItem("token");
    router.push("/admin/login");
  }
  return Promise.reject(error);
});

export default http;
