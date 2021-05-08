<template>
  <div class="app-container-body">
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加课程</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text"
            >确定添加</el-button
          > -->
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

          <el-form-item label="课程名称" prop="course_name">
            <el-input v-model="ruleForm.course_name"></el-input>
          </el-form-item>

          <el-form-item label="教工号" prop="staff_no">
            <el-input v-model="ruleForm.staff_no"></el-input>
          </el-form-item>

          <el-form-item label="班级编号" prop="class_no">
            <!-- <el-input v-model="ruleForm.class_no"></el-input> -->
            <el-select v-model="ruleForm.class_no" placeholder="请选择班级">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" prop="start_time">
            <el-select
              v-model="ruleForm.start_time"
              placeholder="请选择开始周数"
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

          <el-form-item label="结束时间" prop="end_time">
            <el-select v-model="ruleForm.end_time" placeholder="请选择结束周数">
              <el-option label="第七周" value="7"></el-option>
              <el-option label="第八周" value="8"></el-option>
              <el-option label="第九周" value="9"></el-option>
              <el-option label="第十周" value="10"></el-option>
              <el-option label="第十一周" value="11"></el-option>
              <el-option label="第十二周" value="12"></el-option>
              <el-option label="第十三周" value="13"></el-option>
              <el-option label="第十四周" value="14"></el-option>
              <el-option label="第十五周" value="15"></el-option>
              <el-option label="第十六周" value="16"></el-option>
              <el-option label="第十七周" value="17"></el-option>
              <el-option label="第十八周" value="18"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="学年" prop="year">
            <el-select v-model="ruleForm.year" placeholder="请选择学年">
              <el-option label="2020" value="2020"></el-option>
              <el-option label="2021" value="2021"></el-option>
              <el-option label="2022" value="2022"></el-option>
              <el-option label="2023" value="2023"></el-option>
              <el-option label="2024" value="2024"></el-option>
              <el-option label="2025" value="2025"></el-option>
              <el-option label="2026" value="2026"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="学期" prop="semester">
            <el-select v-model="ruleForm.semester" placeholder="请选择学年">
              <el-option label="春季期" value="春"></el-option>
              <el-option label="秋季期" value="秋"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="学分" prop="credit">
            <el-select v-model="ruleForm.credit" placeholder="请选择学年">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开学时间" required>
            <el-col :span="11">
              <el-form-item prop="start_date">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.start_date"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="成绩是否录入" prop="resultinput">
            <el-switch
              v-model="ruleForm.resultinput"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>

          <el-form-item label="课程状态" prop="state">
            <el-radio-group v-model="ruleForm.state">
              <el-radio label="waiting">未开始</el-radio>
              <el-radio label="ing">进行中</el-radio>
              <el-radio label="end">已结束</el-radio>
            </el-radio-group>
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
import { filterDate } from "../../network/formatDate.js";
export default {
  data() {
    return {
      ruleForm: {
        course_no: "",
        course_name: "",
        staff_no: sessionStorage.getItem("staff_no"),
        class_no: "",
        year: "2021",
        semester: "",
        credit: "",
        state: "waiting",
        start_time: "",
        end_time: "",
        start_date: filterDate(new Date()),
        resultinput: false,
        remark: "test",
      },
      options: [],
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
  created() {
    this.getClassName();
  },
  methods: {
    async getClassName() {
      await this.$http
        .post("/cms/class/1?_method=GET&class_no=")
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            var list = res.data.data;

            var class_options = [];
            list.forEach(function (item, index) {
              class_options[index] = {};

              class_options[index].value = item.class_no;
              class_options[index].label = item.class_name;
            });

            this.options = class_options;
            // console.log(this.classlist);
            console.log(this.options);
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        // console.log(this.ruleForm);
        this.$http
          .post("/cms/curs/1?_method=POST", [
            {
              course_no: this.ruleForm.course_no,
              course_name: this.ruleForm.course_name,
              staff_no: this.ruleForm.staff_no,
              class_no: this.ruleForm.class_no,
              year: this.ruleForm.year,
              semester: this.ruleForm.semester,
              credit: this.ruleForm.credit,
              state: this.ruleForm.state,
              start_time: this.ruleForm.start_time,
              end_time: this.ruleForm.end_time,
              start_date: this.ruleForm.start_date,
              resultinput: this.ruleForm.resultinput,
              remark: this.ruleForm.remark,
            },
          ])
          .then((res) => {
            console.log(res);
            this.$message({
              message: "添加课程成功！",
              type: "success",
            });
            this.resetForm("ruleForm");
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
  overflow: scroll;
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