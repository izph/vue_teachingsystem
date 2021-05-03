<template>
  <div>
    <el-table :data="inspectionData" border style="width: 100%">
      <el-table-column align="center" prop="student_name" label="名字" width="200">
      </el-table-column>
      <el-table-column align="center" prop="student_no" label="学号" width="200">
      </el-table-column>
      <el-table-column align="center" prop="score" label="抽查得分" width="200">
      </el-table-column>
      <el-table-column align="center" prop="weekday" label="星期X" width="200">
      </el-table-column>
      <el-table-column align="center" prop="week" label="周数" width="200">
      </el-table-column>
      <el-table-column align="center" prop="course_name" label="课程名称" width="250">
      </el-table-column>
      <el-table-column align="center" prop="time_frame" label="上课时段" width="200">
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="atten_Edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="commitEdit()">保存</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inspectionData: [],
    };
  },
  created() {
    this.getInspection();
  },
  methods: {
    // 获取学生抽查数据
    async getInspection() {
      console.log(this.$route.params.student_no);
      await this.$http
        .post(
          `/api/cms/inspect/1?_method=GET&student_no=${this.$route.params.student_no}`
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            // console.log(res);
            this.inspectionData = res.data.data;
          }
        });
    },
  },
};
</script>
