<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加成绩</el-button
    >

    <el-button type="success" @click="dialogFormVisible = true"
      >导入成绩数据</el-button
    >

    <el-button type="text" @click="sendGrade()">添加成绩数据到后台</el-button>
    <el-table
      v-loading="listLoading"
      :data="list.gradeinfo"
      element-loading-text="Loading"
      border
      stripe
      empty-text="无"
      highlight-current-row
      :default-sort="{ prop: 'id', order: 'undescending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        align="center"
        label="学号"
        prop="student_no"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.student_no }}</template>
      </el-table-column>
      <el-table-column label="课程编号" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.course_no }}</template>
      </el-table-column>
      <el-table-column label="平时成绩" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.usual }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期末成绩" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.end_of_term }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="created_at"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            size="mini"
            @click="handleEdit(scope.row)"
            title="修改记录"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            title="删除记录"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="添加成绩"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="学号" prop="student_no">
          <el-input v-model="form.student_no" />
        </el-form-item>
        <el-form-item label="课程编号" prop="course_no">
          <el-input v-model="form.course_no" />
        </el-form-item>
        <el-form-item label="平时成绩" prop="usual">
          <el-input v-model="form.usual" />
        </el-form-item>
        <el-form-item label="期末成绩" prop="end_of_term">
          <el-input v-model="form.end_of_term" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGrade(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      index: 0,
      form: {
        student_no: "",
        course_no: "",
        usual: "",
        end_of_term: "",
        remark: "",
      },
      list: {
        allCount: 0,
        gradeinfo: [],
      }, // 返回数据列表
      sendlist: {
        sendgrade: [],
      }, // 返回数据列表,
      rules: {},
    };
  },
  computed: {},
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      this.sendlist.sendgrade = val;
      // this.multipleSelection = val;
    },
    sendGrade() {
      console.log(this.sendlist.sendgrade);
    },
    addGrade(form) {
      console.log(form);

      this.dialogFormVisible = false;
      this.list.gradeinfo.push({
        student_no: form.student_no,
        course_no: form.course_no,
        usual: form.usual,
        end_of_term: form.end_of_term,
        remark: form.remark,
      });
    },
    onSubmit() {
      // console.log(this.form);
      TeacherList({ tid: this.form.tid, major_name: this.major }).then(
        (response) => {
          console.log(response);
          this.list = response.info.list[0];
          if (!response.info.allCount) {
            this.$message({
              showClose: true,
              message: "该账号不存在，或不属于该系!!",
              type: "error",
            });
            return;
          } else {
            this.form.t_id = this.list._id;
            console.log(this.form);
            SalaryAdd(this.form)
              .then((res) => {
                // console.log(res);
                if (res.code === 1) {
                  this.$message({
                    showClose: true,
                    message: "添加成功!!",
                    type: "success",
                  });
                  this.$refs["form"].resetFields();
                } else {
                  this.$message({
                    showClose: true,
                    message: "添加失败!!",
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      );
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
.app-container {
  width: 70%;
}
</style>

