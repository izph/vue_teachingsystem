<template>
  <el-table :data="class_stu_list" border stripe current-row-key id="out-table">
    <el-table-column
      type="index"
      align="center"
      label="序号"
      width="70px"
    ></el-table-column>
    <el-table-column
      type="id"
      align="center"
      label="ID"
      prop="id"
      width="70px"
    ></el-table-column>
    <el-table-column
      sortable
      label="学生姓名"
      prop="student_name"
      align="center"
    ></el-table-column>
    <el-table-column
      label="学号"
      prop="student_no"
      align="center"
      sortable
    ></el-table-column>
    <el-table-column label="性别" prop="gender" align="center">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.gender === 'male' ? 'success' : 'danger'"
          disable-transitions
          >{{ scope.row.gender == "male" ? "男" : "女" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="所在班级" prop="class_name" align="center">
      <template slot-scope="scope">
        <el-tag disable-transitions>{{ scope.row.class_name }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <!-- 出勤按钮 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="medium"
          @click="toAttendence(scope.row.student_no)"
          >出勤</el-button
        >
        <!-- 抽查按钮 -->

        <el-button
          type="danger"
          icon="el-icon-delete"
          size="medium"
          slot="reference"
          style="margin: 0 15px"
          @click="toInspection(scope.row.student_no)"
          >抽查
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      // 该班级学生信息
      class_stu_list: [],
    };
  },
  created() {
    this.getclass_stu_list();
  },
  methods: {
    //跳转至该班级学生列表
    async getclass_stu_list() {
      // console.log(this.$route.params.class_no);
      // let class_no = this.$route.params.class_no;
      let class_no = this.$route.params.class_no;
      // sessionStorage.setItem("class_no", class_no);
      // class_no = sessionStorage.getItem("class_no");
      await this.$http
        .post(`/api/cms/stu/1?_method=GET&class_no=${class_no}`)
        .then((res) => {
          if (res.status !== 200) {
            return this.error("失败");
          }
          // console.log(res.data.data);
          this.class_stu_list = res.data.data;
        });
    },
    // 跳转至该学生的出勤情况
    toAttendence(student_no) {
      this.$router.push({
        name: "Attendence",
        params: {
          student_no: student_no,
        },
      });
    },

    // 跳转至该学生的抽查情况
    toInspection(student_no) {
      this.$router.push({
        name: "Inspection",
        params: {
          student_no: student_no,
        },
      });
    },
  },
};
</script>
