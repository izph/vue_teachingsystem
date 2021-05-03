import Vue from "vue";
import axios from "axios";

import { Loading, Message } from 'element-ui';
import router from "../router";


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

let http = axios.create({
  //baseURL: "http://47.94.225.225"
  //baseURL: '/api',
  withCredentials: true,
  // timeout: 5000
});

//请求拦截器
http.interceptors.request.use(config => {
  startLoading();
  return config;
}, error => {
  return Promise.reject(error);
});


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
