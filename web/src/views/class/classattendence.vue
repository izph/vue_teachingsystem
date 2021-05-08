<template>
  <div>
    <el-table :data="attendenceData" border style="width: 100%">
      <el-table-column align="center" prop="student_name" label="名字" width="150">
      </el-table-column>
      <el-table-column align="center" prop="student_no" label="学号" width="120">
      </el-table-column>
      <el-table-column align="center" prop="course_name" label="课程名" width="120">
      </el-table-column>
      <el-table-column align="center" prop="weekday" label="上课时间" width="120">
      </el-table-column>
      <el-table-column align="center" prop="week" label="周数" width="120">
      </el-table-column>
      <el-table-column align="center" prop="attend" label="出席" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.attend"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            :disabled="el_switch"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="leeve" label="请假" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.leeve"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            :disabled="el_switch"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="late" label="迟到" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.late"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            :disabled="el_switch"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="leave_early" label="早退" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.leave_early"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            :disabled="el_switch"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注" width="150">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="atten_Edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="commitEdit()">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog
      title="修改出勤信息"
      :visible.sync="editBoxVisible"
      width="30%"
      :before-close="editClose"
      :append-to-body="true"
    >
      <el-form
        :model="editForm"
        status-icon
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-from-item prop="attend" label="出席" :formatter="formatBoolean">
          <el-switch
            v-model="editForm.attend"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-from-item>
        <el-from-item prop="leeve" label="请假" :formatter="formatBoolean">
          <el-switch
            v-model="editForm.leeve"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-from-item>
        <el-from-item prop="late" label="迟到" :formatter="formatBoolean">
          <el-switch
            v-model="editForm.late"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-from-item>
        <el-from-item prop="leave_early" label="早退" :formatter="formatBoolean">
          <el-switch
            v-model="editForm.leave_early"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-from-item>
        <el-form-item>
          <el-button type="primary" @click="commitEdit()">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      attendenceData: [],

      // 控制表格中el-switch是否禁用
      el_switch: true,

      // 编辑表单
      editForm: {},
    };
  },

  created() {
    this.getAttendence();
  },
  methods: {
    // 获取学生出勤数据
    async getAttendence() {
      console.log(this.$route.params.student_no);
      await this.$http
        .post(`/cms/attn/2?_method=GET&student_no=${this.$route.params.student_no}`)
        .then((res) => {
          if (res.status == 200) {
            this.attendenceData = res.data.data;
            // console.log(this.attendenceData);
          }
        });
    },

    //格式化表格中的布尔值
    /*布尔值格式化：cellValue为后台返回的值
     */
    // formatBoolean: function (row, column, cellValue) {
    //   if (cellValue) {
    //     return "是";
    //   } else {
    //     return "否";
    //   }
    // },

    // 编辑出勤信息
    atten_Edit(row) {
      this.el_switch = !this.el_switch;
      /* if (this.el_switch) {
        this.btn_text = "编辑";
      } else {
        this.btn_text = "保存";
      } */
      this.editForm = row;
      // this.editForm.attend = this.editForm.attend ? 1 : 0;
      // this.editForm.absent = this.editForm.attend ? 0 : 1;
      // this.editForm. = this.editForm.attend ? 1 : 0;
      // this.editForm.attend = this.editForm.attend ? 1 : 0;
      console.log(this.editForm);
    },

    // 提交修改后的出勤信息
    async commitEdit() {
      //发起修改出勤信息的网络请求
      console.log(this.editForm);
      this.$set(this.editForm, "remark", "");
      await this.$http
        .post("/cms/attn/2?_method=POST", [
          {
            student_no: this.editForm.student_no,
            course_no: this.editForm.course_no,
            week: this.editForm.week,
            weekday: this.editForm.weekday,
            time_frame: this.editForm.time_frame,
            attend: this.editForm.attend,
            absent: !this.editForm.attend,
            leeve: this.editForm.leeve,
            late: this.editForm.late,
            leave_early: this.editForm.leave_early,
            remark: this.editForm.remark,
          },
        ])
        .then((res) => {
          if (res.status !== 200) {
            return this.$message.error("失败");
            console.log(res);
          }
          // 禁用修改switch
          this.el_switch = true;

          // 刷新出勤信息列表
          this.getAttendence();

          this.$message.success("成功");
        });
    },
  },
};
</script>
