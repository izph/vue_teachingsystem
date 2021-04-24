<template>
  <div class="app-container">
    <el-card class="el-card">
      <div slot="header" class="clearfix">
        <span>添加学生信息</span>
        <el-button style="float: right" type="success" size="mini"
          >导入学生信息</el-button
        >
      </div>

      <el-form
        class="addForm"
        ref="addForm"
        :model="addForm"
        label-width="120px"
        :rules="addFormRules"
      >
        <el-form-item label="姓名" prop="student_name">
          <el-input v-model="addForm.student_name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="student_no">
          <el-input v-model="addForm.student_no"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="addForm.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级编号" prop="class_no">
          <!-- <el-input v-model="ruleForm.class_no"></el-input> -->
          <el-select v-model="addForm.class_no" placeholder="请选择班级">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
        <center>
          <el-button type="primary" @click="onSubmit('addForm')"
            >添加</el-button
          >
          <el-button @click="resetForm('addForm')">重置</el-button>
        </center>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddStudent",
  props: ["classlist"],
  data() {
    return {
      options: [],

      addForm: {
        student_name: "",
        student_no: "",
        gender: "",
        class_no: "",
        remark: "test",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        student_name: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            message: "姓名的长度在1~6个字符之间",
            trigger: "blur",
          },
        ],
        student_no: [
          { required: true, message: "请输入9位数的学号", trigger: "blur" },
          {
            required: true,
            message: "请输入9位数的学号",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, trigger: "blur" }],
        class_no: [
          { required: true, message: "请输入班级号", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入备注信息", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  watch: {
    classlist: function (val) {
      console.log(val); // 接收父组件的值
      this.options = val;
    },
  },
  created() {},
  methods: {
    onSubmit(formName) {
      console.log(this.addForm);
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.add-title {
  text-align: center;
  color: black;
  font-size: 30px;
  margin-bottom: 20px;
}
.app-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 100px auto;
  width: 50%;
}
.addform-button {
  text-align: center;
}
.el-card {
  position: relative;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>