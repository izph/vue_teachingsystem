// 格式化时间，value是new Date().getTime()的数值 格式以后的样式是 2021-2-1
const filterDate = value => {
  // 根据本地时间把Date对象的日期部分转换为字符串
  return new Date(value).toLocaleDateString().replace(/\//g, "-");  //  \/转义
}
export { filterDate }

