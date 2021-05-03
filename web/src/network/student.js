import { requestStudentData } from "./request";

//学生登录请求
export function studentLogin(data) {
  return requestStudentData({
    url: "/login",
    method: "post",
    data
  });
}

//登录后请求个人信息
export function getLoginStudentInfo() {
  return requestStudentData({
    url: "/",
    method: "get"
  });
}

//请求公告信息
export function getStudentNoticeInfo() {
  return requestStudentData({
    url: "/notice",
    method: "get"
  });
}

//更新学生个人信息
export function updateStudentInfo(data) {
  return requestStudentData({
    url: "/info",
    method: 'put',
    data
  });
}



