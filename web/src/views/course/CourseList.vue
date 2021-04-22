<template>
  <div class="data-manage-table">
    <el-table :data="courselist" stripe border class="table">
      <el-table-column
        prop="course_no"
        label="课程编号"
        width="150"
        align="center"
        height="250"
      />
      <el-table-column
        label="课程名称"
        width="150"
        prop="course_name"
        align="center"
      />
      <el-table-column
        label="任课老师"
        width="120"
        prop="user_name"
        align="center"
      />

      <el-table-column
        label="开课时间"
        prop="start_time"
        align="center"
        sortable
        width="180"
      />
      <el-table-column
        label="结课时间"
        prop="end_time"
        align="center"
        sortable
        width="180"
      />
      <el-table-column
        label="开学时间"
        width="180"
        prop="start_date"
        align="center"
      />
      <el-table-column label="学分" align="center" width="100" prop="credit" />
      <el-table-column label="学年" align="center" width="100" prop="year" />
      <el-table-column
        label="学期"
        prop="semester"
        align="center"
        width="100"
      />
      <el-table-column label="上课班级" prop="class_name" align="center" />

      <el-table-column
        label="成绩是否录入"
        prop="resultinput"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.resultinput"
            active-color="#13ce66"
            inactive-color="#eee"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="课程状态" prop="state" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="goAuditionDetail(scope.row.id)"
            >查看调查问卷</el-button
          >

          <!--  点击调查问卷时，传递对应参数，展示弹框内容  -->
        </template>
      </el-table-column>
    </el-table>

    <!--  分页  -->

    <el-pagination
      :page-size="page_size"
      :total="totalNum"
      :current-page="currentPage"
      layout="prev, pager, next, jumper"
      class="pagination"
      @current-change="handleCurrentChange"
    />

    <!--  弹框 -->

    <el-dialog :visible.sync="dialogFormVisible" title="查看调查问卷">
      <div v-for="(item, index) in data" :key="index">
        <el-form class="see-questionnaire">
          <el-row :gutter="20">
            <el-col :span="5" class="item-title"> 标题: </el-col>
            <el-col :span="19">
              {{ item.question | filterDate }}
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5" class="item-title"> 问卷链接: </el-col>
            <el-col :span="19">
              {{ item.answer | filterDate }}
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//  引入control层去调用接口

export default {
  filters: {
    filterDate(val) {
      //时间兼容处理函数
      return val || "--";
    },
  },
  props: {
    list: {
      //父组件传递list值校验
      type: Array,
      default: () => [],
    },
    totalNum: {
      //父组件传递 totalNum值校验
      type: Number,
      default: 0,
    },
  },
  data() {
    //子组件里面的值设置
    return {
      value: true,
      currentPage: 1,
      page_size: 20,
      dialogFormVisible: false, //默认不展示弹框
      formLabelWidth: "120",
      data: {},
      courselist: [
        {
          course_name: "R语言数据分析", // 课程名称
          year: "2020", // 学年
          user_name: "王利", // 教师姓名
          end_time: 18, // 结课时间（第几周）
          resultinput: false, // 成绩是否录入
          start_time: 1, // 开课时间（第几周）
          semester: "秋", // 学期
          id: 6, // id
          course_no: "12019", // 课程编号
          state: "waiting", // 课程状态
          credit: 1, // 学分
          class_name: "2019级(2)班", // 上课的班级名程
          start_date: 1598889600000, // 开学时间（需要转换）
        },
        {
          course_name: "R语言数据分析", // 课程名称
          year: "2020", // 学年
          user_name: "王利", // 教师姓名
          end_time: 18, // 结课时间（第几周）
          resultinput: true, // 成绩是否录入
          start_time: 1, // 开课时间（第几周）
          semester: "秋", // 学期
          id: 6, // id
          course_no: "83596", // 课程编号
          state: "waiting", // 课程状态
          credit: 1, // 学分
          class_name: "2019级(2)班", // 上课的班级名程
          start_date: 1598889600000, // 开学时间（需要转换）
        },
        {
          course_name: "R语言数据分析", // 课程名称
          year: "2020", // 学年
          user_name: "王利", // 教师姓名
          end_time: 18, // 结课时间（第几周）
          resultinput: true, // 成绩是否录入
          start_time: 1, // 开课时间（第几周）
          semester: "秋", // 学期
          id: 6, // id
          course_no: "27835", // 课程编号
          state: "waiting", // 课程状态
          credit: 1, // 学分
          class_name: "2019级(2)班", // 上课的班级名程
          start_date: 1598889600000, // 开学时间（需要转换）
        },
        {
          course_name: "数据结构与算法", // 课程名称
          year: "2020", // 学年
          user_name: "王利", // 教师姓名
          end_time: 18, // 结课时间（第几周）
          resultinput: false, // 成绩是否录入
          start_time: 1, // 开课时间（第几周）
          semester: "秋", // 学期
          id: 6, // id
          course_no: "27835", // 课程编号
          state: "waiting", // 课程状态
          credit: 1, // 学分
          class_name: "2019级(2)班", // 上课的班级名程
          start_date: 1598889600000, // 开学时间（需要转换）
        },
        {
          course_name: "R语言数据分析", // 课程名称
          year: "2020", // 学年
          user_name: "王利", // 教师姓名
          end_time: 18, // 结课时间（第几周）
          resultinput: true, // 成绩是否录入
          start_time: 1, // 开课时间（第几周）
          semester: "秋", // 学期
          id: 6, // id
          course_no: "27835", // 课程编号
          state: "waiting", // 课程状态
          credit: 1, // 学分
          class_name: "2019级(2)班", // 上课的班级名程
          start_date: 1598889600000, // 开学时间（需要转换）
        },
      ],
    };
  },
  methods: {
    handleCurrentChange(val) {
      //点击当前页，传递当前页码给父组件
      this.$emit("pageTurn", val);
    },
    goAuditionDetail(id) {
      DataResearch.questionDeatil({ answer_id: id }) // 调用接口数据
        .then((res) => {
          if (res.code === 0) {
            this.data = res.data;
            this.dialogFormVisible = true;
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "获取作答详情失败，请稍候重试！",
          });
          this.dialogFormVisible = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.data-manage-table {
  .el-table__body-wrapper {
    overflow: hidden;
  }
  .el-dialog__title {
    font-size: 18px;
    line-height: 24px;
    color: #303133;
    font-weight: normal;
  }
  .el-form-item {
    margin: 5px;
  }
  .el-dialog {
    width: 600px;
  }
  .el-table {
    .table-intro {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
    }
  }
  .pagination {
    margin: 10px 0;
    text-align: right;
  }

  .item-title {
    font-size: 14px;
    color: #606266;
    text-align: right;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .see-questionnaire {
    padding-bottom: 20px;
  }
}
</style>
