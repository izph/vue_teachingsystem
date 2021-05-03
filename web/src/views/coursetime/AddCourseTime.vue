<template>
  <div class="app-container-body">
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加上课时间</span>
          <i style="float: right; padding: 3px 0" class="el-icon-menu"></i>
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
            <el-select v-model="ruleForm.weekday" placeholder="请选择星期几">
              <el-option label="星期一" value="Mon"></el-option>
              <el-option label="星期二" value="Tue"></el-option>
              <el-option label="星期三" value="Wed"></el-option>
              <el-option label="星期四" value="Thu"></el-option>
              <el-option label="星期五" value="Fri"></el-option>
              <el-option label="星期六" value="Sat"></el-option>
              <el-option label="星期天" value="Sun"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="上课时间" prop="time_frame">
            <el-input v-model="ruleForm.time_frame"></el-input>
          </el-form-item>

          <el-form-item label="上课地点" prop="place">
            <el-input v-model="ruleForm.place"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即添加</el-button
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
        course_no: "", //课程编号
        weekday: "", //星期几
        time_frame: "", //上课时间段
        place: "", //上课地点
        remark: "",
      },
      rules: {
        course_no: [
          {
            required: true,
            message: "请输入已存在的并且正确的课程编号",
            trigger: "blur",
          },
          {
            min: 10,
            max: 30,
            message: "长度在 15 到 30 个号码",
            trigger: "blur",
          },
        ],
        weekday: [
          { required: true, message: "请选择星期几上课", trigger: "blur" },
        ],
        time_frame: [
          {
            required: true,
            message: "请选择上课时间",
            trigger: "blur",
          },
        ],
        place: [
          {
            required: true,
            message: "请选择上课地点",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入备注信息",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm);

      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.$http
          .post("/cms/coursetime/1?_method=POST", [
            {
              course_no: this.ruleForm.course_no,
              weekday: this.ruleForm.weekday,
              time_frame: this.ruleForm.time_frame,
              place: this.ruleForm.place,
              remark: this.ruleForm.remark,
            },
          ])
          .then((res) => {
            console.log(res);
            if (res.status == 200 && res.data.update == 1) {
              this.$message({
                message: "课程添加上课时间成功！",
                type: "success",
              });
              this.resetForm("ruleForm");
            }
          });
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