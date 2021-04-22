<template>
  <div class="app-container">
    <el-form-item>
      <h2 class="add-title">添加用户信息</h2>
    </el-form-item>

    <el-form
      class="addForm"
      ref="addForm"
      :model="addForm"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="姓名" prop="student_name">
        <el-input v-model="addForm.student_name"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="student_no">
        <el-input v-model="addForm.student_no"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="addForm.gender">
          <el-radio label="男" value="male"></el-radio>
          <el-radio label="女" value="female"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="班级" prop="class_name">
        <el-input v-model="addForm.class_name"></el-input>
      </el-form-item>

      <el-form-item class="addform-button">
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remarkInfo: [
        { id: 1, remark: "admin" },
        { id: 2, remark: "test" },
        { id: 3, remark: "null" },
      ], // 学院信息
      addForm: {
        student_name: "",
        student_no: "",
        gender: "",
        class_name: "未点名",
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
            min: 9,
            max: 9,
            message: "请输入9位数的学号",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, trigger: "blur" }],
        class_name: [
          { required: true, message: "请输入点名信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  created() {
    // 是否为院级管理员登录
    // if (this.major) {
    //   this.form.major_name = this.major;
    // } else {
    //   this.getDepartmentList();
    // }
  },
  methods: {
    // 获取学院列表
    getDepartmentList() {},
    onSubmit() {
      console.log(this.form);
      TeacherAdd(this.form)
        .then((res) => {
          console.log(res);
          if (res.code === 1) {
            this.$message("添加成功!");
            this.$refs["form"].resetFields();
          } else {
            this.$message("添加失败！");
          }
        })
        .catch((err) => {
          console.log(err);
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
</style>