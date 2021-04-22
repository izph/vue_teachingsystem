<template>
  <div class="app-container">
    <el-form
      class="demo-form-inline"
      :inline="true"
      :model="formInline"
      size="mini"
    >
      <el-form-item label>
        <el-select placeholder="查询类别" v-model="formInline.region">
          <el-option label="课程名" value="course_name"></el-option>
          <el-option label="综合成绩优秀以上" value="cname"></el-option>
          <el-option label="综合成绩良好以上" value="cname"></el-option>
          <el-option label="综合成绩及格以上" value="cname"></el-option>
          <el-option label="综合成绩不及格" value="cname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-input placeholder="查询条件" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          plain
          icon="el-icon-search"
          @click="SearchHandle"
        ></el-button>
      </el-form-item>
      <i class="opera" title="添加记录" @click="AddTeacherRow">添加记录</i>
    </el-form>
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
      <el-table-column align="center" label="学生姓名" prop="id" width="120">
        <template slot-scope="scope">{{ scope.row.student_name }}</template>
      </el-table-column>
      <el-table-column label="课程名字" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.course_name }}</template>
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
      <el-table-column
        align="center"
        prop="allgrade"
        label="综合成绩"
        width="120"
        sortable
      >
        <template slot-scope="scope">{{
          scope.row.usual * 0.3 + scope.row.end_of_term * 0.7
        }}</template>
      </el-table-column>

      <el-table-column label="成绩等级" align="center" width="130">
        <template slot-scope="scope">
          <span>{{
            scope.row.usual * 0.3 + scope.row.end_of_term * 0.7 > 60
              ? "及格"
              : "不及格"
          }}</span>
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
            style="margin: 0 15px"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            title="删除记录"
            style="margin: 0 15px"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.allCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        allCount: 0,
        gradeinfo: [
          {
            student_name: "叶敏", //学生姓名
            usual: 88, //平时成绩
            course_name: "计算机网路", //课程名
            end_of_term: 82, //期末成绩
            id: 1455, //id
          },
          {
            student_name: "叶敏", //学生姓名
            usual: 88, //平时成绩
            course_name: "计算机网路", //课程名
            end_of_term: 82, //期末成绩
            id: 1455, //id
          },
          {
            student_name: "叶敏", //学生姓名
            usual: 98, //平时成绩
            course_name: "计算机网路", //课程名
            end_of_term: 95, //期末成绩
            id: 1455, //id
          },
          {
            student_name: "叶敏", //学生姓名
            usual: 70, //平时成绩
            course_name: "计算机网路", //课程名
            end_of_term: 40, //期末成绩
            id: 1455, //id
          },
          {
            student_name: "叶敏", //学生姓名
            usual: 60, //平时成绩
            course_name: "计算机网路", //课程名
            end_of_term: 50, //期末成绩
            id: 1455, //id
          },
          {
            student_name: "叶敏", //学生姓名
            usual: 80, //平时成绩
            course_name: "计算机网路", //课程名
            end_of_term: 80, //期末成绩
            id: 1455, //id
          },
          {
            student_name: "叶敏", //学生姓名
            usual: 60, //平时成绩
            course_name: "计算机网路", //课程名
            end_of_term: 80, //期末成绩
            id: 1455, //id
          },
        ],
      }, // 返回数据列表
      //listLoading: true, // 加载中

      formInline: {
        // 搜索条件，value
        user: "",
        region: "",
      },
      currentPage: 1, // 分页，当前页数
      per: 10, // 每页的条数
    };
  },
  filters: {},
  created() {
    // 初始化列表
    // this.fetchData();
  },
  methods: {
    Grades(score) {
      console.log(typeof score);
      switch (score) {
        case score >= 90:
          return "优秀";
          break;
        case score < 90 && score >= 80:
          return "良好";
          break;
        case score < 80 && score >= 70:
          return "一般";
          break;
        case score < 70 && score >= 60:
          return "及格";
          break;
        case score < 70:
          return "不及格";
          break;
      }
    },

    // 获取列表信息

    fetchData() {
      this.listLoading = true;
      const title = this.formInline.region;
      const content = this.formInline.user;
      // 将查询条件传递过去
      var data = {};
      data[title] = content;
      data.page = this.currentPage;
      data.per = this.per;
      /*  data.major_name = "会计学院";
      console.log(data); */
      if (this.major) {
        console.log(this.major);
        data.major_name = this.major;
        // 调用排课信息列表
        ScheduleList(data).then((response) => {
          console.log(response);
          var count = 0;
          this.list.list = [];
          response.info.list.forEach((item) => {
            if (item.t_id) {
              console.log(item);
              count += 1;
              this.list.list.push(item);
            }
          });
          this.list.allCount = count;
          console.log(this.list);
          this.listLoading = false;
        });
      } else {
        // 调用排课信息列表
        ScheduleList(data).then((response) => {
          console.log(response);
          this.list = response.info;
          this.listLoading = false;
        });
      }
    },
    // 按条件查询
    SearchHandle() {
      this.fetchData();
    },
    // 添加新纪录
    AddTeacherRow() {
      this.$router.push("/schedule/ScheduleAdd");
    },
    // 编辑按钮
    handleEdit(row) {
      console.log(row);
      // 跳转到修改页面
      this.$router.push({ name: "ScheduleMotify", params: row });
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(1111);
          ScheduleDelete(row._id).then((res) => {
            // console.log(res)
            if (res.code === 1) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetchData();
            } else {
              this.$message({
                type: "info",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 全选
    handleSelectionChange(val) {
      console.log(val);
      // this.multipleSelection = val;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.per = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.fetchData();
    },
  },
};
</script>
<style scoped>
.app-container {
  width: 1042px;
  border-bottom: 1px solid #cecece;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}
.opera {
  cursor: pointer;
  margin-top: 6px;
  margin-right: 25px;
  float: right;
  font-size: 12px;
  font-style: normal;
  color: #a79d9d;
}
.opera:hover {
  color: #409eff;
}
.block {
  padding-top: 15px;
  display: flex;
  justify-content: center;
}
</style>