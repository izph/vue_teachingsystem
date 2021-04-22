<template>
  <div class="attendance-container">
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="student_no"
          label="学号"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="student_name"
          label="学生姓名"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column label="学生出勤信息" align="center">
          <el-table-column
            prop="attend"
            label="出勤"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.attend"
                active-color="#409eff"
                inactive-color="#eee"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="late" label="迟到" width="150" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.late"
                active-color="#e6a23c"
                inactive-color="#eee"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="leave_early"
            label="早退"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.leave_early"
                active-color="#909399"
                inactive-color="#eee"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="absent"
            label="缺席"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.absent"
                active-color="#f56c6c"
                inactive-color="#eee"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="leeve" label="请假" width="150" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.leeve"
                active-color="#13ce66"
                inactive-color="#eee"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          student_name: "叶敏", //姓名
          student_no: "2017000201", //学号
          attend: true, //出席
          late: false, //迟到
          leave_early: false, //早退
          absent: false, //缺席
          leeve: false, //请假
          remark: "test", //备注
          id: 11701, //id
        },
        {
          student_name: "叶敏", //姓名
          student_no: "2017000201", //学号
          attend: false, //出席
          late: true, //迟到
          leave_early: false, //早退
          absent: false, //缺席
          leeve: false, //请假
          remark: "test", //备注
          id: 11701, //id
        },
        {
          student_name: "叶敏", //姓名
          student_no: "2017000201", //学号
          attend: false, //出席
          late: false, //迟到
          leave_early: true, //早退
          absent: false, //缺席
          leeve: false, //请假
          remark: "test", //备注
          id: 11701, //id
        },
        {
          student_name: "叶敏", //姓名
          student_no: "2017000201", //学号
          attend: false, //出席
          late: false, //迟到
          leave_early: false, //早退
          absent: true, //缺席
          leeve: false, //请假
          remark: "test", //备注
          id: 11701, //id
        },
        {
          student_name: "叶敏", //姓名
          student_no: "2017000201", //学号
          attend: false, //出席
          late: false, //迟到
          leave_early: false, //早退
          absent: false, //缺席
          leeve: true, //请假
          remark: "test", //备注
          id: 11701, //id
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  margin: 0 auto;
  width: 90%;
}
.attendance-container {
  overflow: auto;
  width: 100%;
  height: 100%;
  background: url(../../assets/hqulogo11.jpeg);
  opacity: 0.8;
}
</style>