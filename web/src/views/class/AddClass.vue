<template>
  <div class="app-container-body">
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加班级</span>
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
          <el-form-item label="班级编号" prop="class_no">
            <el-input v-model="ruleForm.class_no"></el-input>
          </el-form-item>

          <el-form-item label="班级名称" prop="class_name">
            <el-input v-model="ruleForm.class_name"></el-input>
          </el-form-item>

          <el-form-item label="年级" prop="grade">
            <el-select v-model="ruleForm.grade" placeholder="请选择年级">
              <el-option label="2015级" value="2015级"></el-option>
              <el-option label="2016级" value="2016级"></el-option>
              <el-option label="2017级" value="2017级"></el-option>
              <el-option label="2018级" value="2018级"></el-option>
              <el-option label="2019级" value="2019级"></el-option>
              <el-option label="2020级" value="2020级"></el-option>
              <el-option label="2021级" value="2021级"></el-option>
              <el-option label="2022级" value="2022级"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="学院" prop="academy">
            <el-select v-model="ruleForm.academy" placeholder="请选择学院">
              <el-option label="数学科学学院" value="数学科学学院"> </el-option>
              <el-option label="计算机学院" value="计算机学院"> </el-option>
              <el-option label="工学院" value="工学院"> </el-option>
              <el-option label="工商管理学院" value="工商管理学院"> </el-option>
              <el-option label="经济与金融学院" value="经济与金融学院">
              </el-option>
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
      academylist: [],
      ruleForm: {},
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
  background: url(../../assets/hqulogo10.jpeg);
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