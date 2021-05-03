<template>
  <div class="user-contain">
    <el-card>
      <div class="block">
        <el-row :gutter="24">
          <el-col :span="9"><div>&nbsp;</div></el-col>
          <el-col :span="6" class="el-col-center"
            ><span>
              {{ teacher.user_name + "(老师)授课表" }}
            </span></el-col
          >
          <el-col :span="9"> &nbsp;</el-col>
        </el-row>
        <el-timeline dot>
          <el-timeline-item
            v-for="(item, index) in alluserInfo"
            :key="index"
            :timestamp="item.year + '-' + item.semester"
            placement="top"
            type="success"
            size="large"
            icon="el-icon-s-help"
          >
            <el-card>
              <div class="text">
                <el-row :gutter="20">
                  <el-col :span="6"
                    ><span class="to-course">{{
                      "课程名称: " + item.course_name
                    }}</span></el-col
                  >
                  <el-col :span="6"
                    ><span>{{ "上课日期: " }}</span
                    ><span>{{ item.weekday | filterDay }}</span></el-col
                  >
                  <el-col :span="6"
                    ><span>{{ "上课时间: " + item.time_frame }}</span></el-col
                  >
                  <el-col :span="6"
                    ><span>{{ "上课地点: " + item.place }}</span></el-col
                  >
                </el-row>
              </div>
              <div class="text">
                <el-row :gutter="20">
                  <el-col :span="6"
                    ><span>{{ "班级名称: " + item.class_name }}</span></el-col
                  >
                  <el-col :span="6"
                    ><span>{{
                      "课程学分: " + item.credit + "分"
                    }}</span></el-col
                  >

                  <!-- <el-col :span="6"
                  ><span>{{ "任课老师: " + item.user_name }}</span></el-col
                > -->
                  <el-col :span="8"
                    ><span>{{ "课程编号: " + item.course_no }}</span></el-col
                  >
                  <el-col :span="4"
                    ><el-button
                      type="primary"
                      round
                      size="mini"
                      style="margin-left: 80px"
                      @click="toCourseDetails(item)"
                      >课程详情</el-button
                    ></el-col
                  >
                </el-row>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  filters: {
    filterDay(value) {
      switch (value) {
        case "Mon":
          return "星期一";
          break;
        case "Tue":
          return "星期二";
          break;
        case "Wed":
          return "星期三";
          break;
        case "Thu":
          return "星期四";
          break;
        case "Fri":
          return "星期五";
          break;
        case "Sat":
          return "星期六";
          break;
        default:
          return "星期天";
      }
    },
  },
  data() {
    return {
      alluserInfo: [],
      userInfo: [],
      courseTimeList: [],
      userCourse: [],
      teacher: {},
    };
  },
  created() {
    this.getUserAllInfo();
  },
  methods: {
    toCourseDetails(item) {
      console.log(item);
      sessionStorage.setItem("row", JSON.stringify(item));

      this.$router.push({
        name: "CourseDetails",
      });
    },
    async getUserAllInfo() {
      var userrow = JSON.parse(sessionStorage.getItem("userrow"));
      this.teacher = userrow;
      //console.log(userrow);
      await this.$http
        .post(`/cms/curs/1?_method=GET&staff_no=${userrow.staff_no}`)
        .then((res) => {
          if (res.status == 200) {
            var userarr = res.data.data;
            userarr.sort(function (a, b) {
              if (a.course_name === b.course_name) {
                //如果year相同，按照course_name的降序
                return a.course_name - a.course_name;
              } else {
                return a.year - b.year;
              }
            });
            this.userInfo = userarr;
            this.alluserInfo = [...this.userInfo];
            console.log(this.userInfo);

            userarr.forEach((item, index) => {
              this.courseTimeList[index] = item.course_no;
            });
          }
        });
      //console.log(this.courseTimeList);
      const { data: res } = await this.$http.post(
        `/cms/coursetime/1?_method=GET`
      );
      var courseData = res.data;
      for (var i = 0; i < this.courseTimeList.length; i++) {
        courseData.forEach((item, index) => {
          if (this.courseTimeList[i] == item.course_no) {
            this.userCourse[this.userCourse.length] = item;
          }
        });
      }
      for (var i = 0; i < this.alluserInfo.length; i++) {
        this.userCourse.forEach((item, index) => {
          if (this.alluserInfo[i].course_no == item.course_no) {
            this.$set(this.alluserInfo[i], "time_frame", item.time_frame);
            this.$set(this.alluserInfo[i], "place", item.place);
            this.$set(this.alluserInfo[i], "weekday", item.weekday);
          }
        });
      }

      //console.log(this.alluserInfo);
    },
  },
};
</script>

<style scoped>
.block {
  width: 80%;
  margin: 50px auto;
}
.text {
  font-size: 20px;
  overflow: hidden;
  margin: 20px 0;
}
.el-col-center {
  font-size: 25px;
  text-align: center;

  -webkit-text-stroke: 1px #409eff;
  -webkit-text-fill-color: transparent;
}
.user-contain {
  overflow: hidden;
}
.to-course {
  cursor: pointer;
}
</style>