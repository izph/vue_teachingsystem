<template>
  <div>
    <el-card>
      <!-- 顶部CRUD区域 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select
            v-model="value"
            filterable
            clearable
            placeholder="请选择班级"
            @change="selectClass(value)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.class_name"
              :value="item.class_no"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="addBoxVisible = true">添加班级</el-button>
          <el-button type="success" @click="getClass()">所有班级</el-button>
        </el-col>
      </el-row>

      <!-- 班级列表 -->
      <el-table
        :data="currentList"
        border
        style="width: 100%"
        @row-dblclick="toClassdetailed"
      >
        <el-table-column align="center" prop="class_id" label="班级ID" width="180">
        </el-table-column>
        <el-table-column align="center" prop="class_name" label="班级名称" width="180">
        </el-table-column>
        <el-table-column align="center" prop="class_no" label="班级编号" width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="academy"
          label="学院"
          width="180"
          :filters="[
            { text: '数学科学学院', value: '数学科学学院' },
            { text: '工商管理学院', value: '工商管理学院' },
            { text: '计算机学院', value: '计算机学院' },
            { text: '工学院', value: '工学院' },
            { text: '经济与金融学院', value: '经济与金融学院' },
          ]"
          :filter-method="filterAcademy"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="grade"
          label="年级"
          width="180"
          column-key="grade"
          :filters="[
            { text: '2017级', value: '2017级' },
            { text: '2018级', value: '2018级' },
            { text: '2019级', value: '2019级' },
            { text: '2020级', value: '2020级' },
            { text: '2021级', value: '2021级' },
          ]"
          :filter-method="filterGrade"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column align="center" prop="num_of_stu" label="学生人数" width="180">
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注"> </el-table-column>
        <el-table-column label="编辑" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="editClass(scope.row)">编辑</el-button>
            <el-popconfirm
              title="确定删除班级吗？"
              @confirm="deleteClass(scope.row.class_id)"
            >
              <el-button size="mini" type="danger" slot="reference" style="margin: 0 15px"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加班级信息对话框 -->
    <el-dialog
      title="添加班级"
      :visible.sync="addBoxVisible"
      width="50%"
      :before-close="addClose"
      :append-to-body="true"
    >
      <!-- 添加班级表单 -->
      <el-form
        :model="addForm"
        status-icon
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="班级编号" prop="class_no">
          <el-input v-model="addForm.class_no"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="class_name">
          <el-input v-model="addForm.class_name"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-select v-model="addForm.grade" placeholder="请选择年级">
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
          <el-select v-model="addForm.academy" placeholder="请选择学院">
            <el-option label="数学科学学院" value="数学科学学院"> </el-option>
            <el-option label="计算机学院" value="计算机学院"> </el-option>
            <el-option label="工学院" value="工学院"> </el-option>
            <el-option label="工商管理学院" value="工商管理学院"> </el-option>
            <el-option label="经济与金融学院" value="经济与金融学院"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级人数" prop="num_of_stu">
          <el-input v-model="addForm.num_of_stu" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addClass()">提交</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑班级信息对话框 -->
    <el-dialog
      title="编辑班级"
      :visible.sync="editBoxVisible"
      width="50%"
      :before-close="editClose"
      :append-to-body="true"
    >
      <!-- 编辑班级表单 -->
      <el-form
        :model="editForm"
        status-icon
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="班级编号" prop="class_no">
          <el-input v-model="editForm.class_no"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="class_name">
          <el-input v-model="editForm.class_name"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-select v-model="editForm.grade" placeholder="请选择年级">
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
          <el-select v-model="editForm.academy" placeholder="请选择学院">
            <el-option label="数学科学学院" value="数学科学学院"> </el-option>
            <el-option label="计算机学院" value="计算机学院"> </el-option>
            <el-option label="工学院" value="工学院"> </el-option>
            <el-option label="工商管理学院" value="工商管理学院"> </el-option>
            <el-option label="经济与金融学院" value="经济与金融学院"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级人数" prop="num_of_stu">
          <el-input v-model="editForm.num_of_stu" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="editForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="commitEdit()">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      value: "",
      // 当前页面列表
      currentList: [],
      // 后端拿到的所有班级数据
      allList: [],

      // 控制添加对话框的显示
      addBoxVisible: false,

      // 控制编辑对话框的显示
      editBoxVisible: false,

      // 添加和编辑表单验证规则
      addForm: {
        class_no: "",
        class_name: "",
        grade: "",
        academy: "",
        num_of_stu: "0",
        remark: "",
      },
      editForm: {
        class_no: "",
        class_name: "",
        grade: "",
        academy: "",
        num_of_stu: "",
        remark: "",
      },

      rules: {
        class_no: [
          { required: true, message: "请输入班级编号", trigger: "blur" },
          { min: 8, max: 8, message: "编号长度为8", trigger: "blur" },
        ],
        class_name: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
        num_of_stu: [{ required: true, message: "请输入班级人数", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getClass();
  },
  methods: {
    // 获取班级列表
    async getClass() {
      await this.$http.post("/api/cms/class/1?_method=GET").then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.allList = res.data.data;
          this.currentList = this.allList;
          // console.log(this.allList);
          this.options = this.allList;
        }
      });
    },

    // 筛选班级
    async selectClass(value) {
      await this.$http
        .post(`/api/cms/class/1?_method=GET&class_no=${value}`)
        .then((res) => {
          if (res.status === 200) {
            this.currentList = res.data.data;
          }
        });
    },

    //添加班级
    async addClass() {
      this.$refs.addForm.validate(async (valid) => {
        if (!valid) return;
        //发起添加班级的网络请求
        console.log(this.addForm);
        await this.$http
          .post("/api/cms/class/1?_method=POST", [
            {
              academy: this.addForm.academy,
              class_name: this.addForm.class_name,
              class_no: this.addForm.class_no,
              grade: this.addForm.grade,
              num_of_stu: this.addForm.num_of_stu,
              remark: this.addForm.remark,
            },
          ])
          .then((res) => {
            if (res.status !== 200) {
              return this.$message.error("失败");
            }
            // 关闭对话框
            this.addBoxVisible = false;

            // 刷新班级列表
            this.getClass();

            this.$message.success("成功");
          })
          .finally(this.resetForm("addForm"));
      });
    },

    //编辑修改班级
    editClass(row) {
      this.editBoxVisible = true;
      this.editForm = row;
      console.log("数据", this.editForm);
    },
    commitEdit() {
      this.$refs.editForm.validate(async (valid) => {
        if (!valid) return;
        //发起修改班级的网络请求
        // console.log(this.editForm);
        await this.$http
          .post("/api/cms/class/1?_method=POST", [
            {
              academy: this.editForm.academy,
              class_name: this.editForm.class_name,
              class_no: this.editForm.class_no,
              grade: this.editForm.grade,
              num_of_stu: this.editForm.num_of_stu,
              remark: this.editForm.remark,
            },
          ])
          .then((res) => {
            if (res.status !== 200) {
              return this.$message.error("失败");
            }
            // 关闭对话框
            this.editBoxVisible = false;

            // 刷新班级列表
            this.getClass();

            this.$message.success("成功");
          })
          .finally(this.resetForm("editForm"));
      });
    },

    //删除班级
    async deleteClass(row) {
      console.log(row);
      // 发起删除请求
      await this.$http
        .post(`/api/cms/class/1?_method=DELETE&id=${class_id}`)
        .then((res) => {
          this.$message.success("删除成功");
        });

      //刷新班级列表
      this.getClass();
    },

    // 添加框关闭前提示
    addClose(done) {
      this.$confirm("确认在未提交前关闭？")
        .then((_) => {
          this.resetForm("addForm");
          done();
        })
        .catch((_) => {});
    },
    //编辑框关闭前提示
    editClose(done) {
      this.$confirm("确认在未保存修改前关闭")
        .then((_) => {
          this.resetForm("editForm");
          done();
        })
        .catch((_) => {});
    },

    // 过滤器
    filterGrade(value, row) {
      return row.grade === value;
    },
    filterAcademy(value, row) {
      return row.academy === value;
    },

    //跳转至该班级学生列表
    toClassdetailed(row) {
      // console.log(row.class_no);
      // //转化为字符串
      // class_no = JSON.stringify(row.class_no);
      // console.log(class_no);
      this.$router.push({
        name: "ClassDetails",
        params: { class_no: row.class_no },
      });
      // this.
      //console.log(row.class_no);
    },

    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
