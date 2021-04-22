<template>
  <div class="app-container-body">
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加上课时间</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >确定添加</el-button
          >
        </div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="课程编号" prop="course_no">
            <el-input v-model="ruleForm.course_no"></el-input>
          </el-form-item>

          <el-form-item label="weekday" prop="weekday">
            <el-input v-model="ruleForm.weekday"></el-input>
          </el-form-item>

          <el-form-item label="上课时间" prop="time_frame">
            <el-input v-model="ruleForm.staff_no"></el-input>
          </el-form-item>

          <el-form-item label="上课地点" prop="place">
            <el-input v-model="ruleForm.place"></el-input>
          </el-form-item>

          <el-form-item label="上课时间" prop="time_frame">
            <el-select
              v-model="ruleForm.time_frame"
              placeholder="请选择上课时间"
            >
              <el-option label="第一周" value="1"></el-option>
              <el-option label="第二周" value="2"></el-option>
              <el-option label="第三周" value="3"></el-option>
              <el-option label="第四周" value="4"></el-option>
              <el-option label="第五周" value="5"></el-option>
              <el-option label="第六周" value="6"></el-option>
              <el-option label="第七周" value="7"></el-option>
              <el-option label="第八周" value="8"></el-option>
              <el-option label="第九周" value="9"></el-option>
              <el-option label="第十周" value="10"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        course_no: "",
        course_name: "植物学基础",
        staff_no: "00000002",
        class_no: "20190002",
        year: "2020",
        semester: "春",
        credit: 3,
        state: "ing",
        start_time: 1,
        end_time: 18,
        start_date: "2021-03-01",
        resultinput: false,
        remark: "test",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style  lang="scss" scoped>
.app-container-body {
  overflow: auto;
  width: 100%;
  height: 100%;
  background: url(../../assets/hqulogo09.jpeg);
}
.app-container {
  width: 700px;
  margin: 50px auto;
}
.text {
  font-size: 18px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix {
  text-align: center;
  font-size: 20px;
  span {
    font-size: 20px !important;
  }
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 700px;
}
</style>