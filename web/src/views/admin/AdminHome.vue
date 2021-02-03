<template>
  <div class="home">
    <div class="container">
      <!-- <h1 class="title">教学管理系统</h1>
      <p class="lead">
        基于Vue.js(ElementUI)+Node.js(Express)+Mongodb(mongoose)开发
      </p> -->
      <el-row :gutter="45">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <div><img src="../../assets/1.png" alt="" /></div>
            <div class="item-font">
              <p>校园新闻</p>
              <p>20</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <div><img src="../../assets/2.png" alt="" /></div>
            <div class="item-font">
              <p>通知公告</p>
              <p>20</p>
            </div>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <div><img src="../../assets/3.png" alt="" /></div>
            <div class="item-font">
              <p>学术新闻</p>
              <p>20</p>
            </div>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <div><img src="../../assets/4.png" alt="" /></div>
            <div class="item-font">
              <p>媒体聚焦</p>
              <p>20</p>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../../assets/showcase.png) no-repeat;
  background-size: 100% 100%;
}
/*
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
} */
.el-row {
  margin-bottom: 20px;

  /* &:last-child {
    margin-bottom: 0;
  } */
}
.container {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.el-col {
  border-radius: 4px;
  height: 80px;
}

.bg-purple {
  background: #ffffff;
  box-shadow: 2px 2px 2px 2px #ccc;
}

.grid-content {
  border-radius: 4px;
  min-height: 100px;
}

.grid-content img {
  float: left;

  padding-top: 25px;
  padding-left: 25px;

  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.item-font {
  float: right;
  font-size: 20px;
  padding-right: 25px;
  color: #777;
  margin-top: 20px;
  cursor: pointer;
}
.item-font p {
  text-align: center;
  height: 20px;
  margin-bottom: 15px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
