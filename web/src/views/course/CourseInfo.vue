<template>
  <div class="courseinfo">
    <div v-for="item in courseInfo" :key="item.id">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ item.coursename }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="toCourseDetails(item.id)"
            >课程详情</el-button
          >
        </div>
        <div class="text item">
          <span class="classname">{{ "班级名称: " + item.classname }}</span>
          <span class="classsize">{{ "班级人数: " + item.classsize }}</span>
          <span class="classtime">{{ "上课时间: " + item.classtime }}</span>
          <span class="classlocation">{{
            "上课地点: " + item.classlocation
          }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  name: "CourseInfo",
  data() {
    return {
      courseInfo: [
        {
          classname: "计算机与科学",
          classsize: "80人",
          classtime: "星期四 上午 1-2节",
          classlocation: "菲华楼401",
        },
        {
          classname: "计算机与科学",
          classsize: "80人",
          classtime: "星期四 上午 1-2节",
          classlocation: "菲华楼401",
        },
        {
          classname: "计算机与科学",
          classsize: "80人",
          classtime: "星期四 上午 1-2节",
          classlocation: "菲华楼401",
        },
        {
          classname: "计算机与科学",
          classsize: "80人",
          classtime: "星期四 上午 1-2节",
          classlocation: "菲华楼401",
        },
      ],
    };
  },
  methods: {
    async getcourseList() {
      //   console.log("hahahahah");
      // const { data: res } = await this.$http.get(
      //   "http://127.0.0.1:8888/api/admin/user/userinfo"
      // );
      // console.log(data.demoLis);
      //this.courseInfo = res.data.data;
    },
    toCourseDetails: function (id) {
      this.$router.push({ name: "CourseDetails", params: { id: id } });
    },
  },
  created() {
    // this.getcourseList();
  },
};
</script>

<style scoped lang="less">
.courseinfo {
  position: relative;
}
.text {
  font-size: 20px;
  span {
    margin: 0 40px;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
  margin: 30px auto;

  width: 80%;
}
</style>