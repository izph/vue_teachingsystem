<template>
  <div class="data-manage-table">
    <el-card>
      <div style="text-align: center">
        <span class="course-center">课程信息列表</span>
      </div>
      <el-table
        :data="courselist"
        stripe
        border
        class="table"
        :header-cell-style="{ background: '#cbfeff', color: 'black' }"
        @row-dblclick="handleRowdblclick"
      >
        <el-table-column prop="id" label="ID" align="center" width="50" />
        <el-table-column prop="course_no" label="课程编号" align="center" height="250" />
        <el-table-column
          label="课程名称"
          prop="course_name"
          align="center"
          :render-header="renderHeader"
        />
        <el-table-column
          label="任课老师"
          width="120"
          prop="user_name"
          align="center"
          :render-header="renderHeader1"
        />

        <el-table-column label="开课时间" prop="start_time" align="center" width="60" />
        <el-table-column label="结课时间" prop="end_time" align="center" width="60" />

        <!-- <el-table-column
          label="开学时间"
          width="150"
          prop="start_date"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.start_date | filterDate }}
          </template>
        </el-table-column> -->

        <el-table-column label="学分" align="center" width="100" prop="credit" sortable />
        <el-table-column label="学年" align="center" width="100" prop="year" />
        <el-table-column label="学期" prop="semester" align="center" width="100" />
        <el-table-column label="上课班级" prop="class_name" align="center" width="150" />

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
        <el-table-column label="课程状态" prop="state" align="center" width="100">
          <template slot-scope="scope">
            <!-- <el-tag
            :type="scope.row.state === 'ing' ? 'success' : 'danger'"
            disable-transitions
            >{{ scope.row.state == "ing" ? "进行中" : "已结课" }}</el-tag
          > -->
            <el-tag :type="filterColor(scope.row.state)" disable-transitions>{{
              scope.row.state | filterState
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="课程详情" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-tickets"
              size="mini"
              @click="toCourseDetails(scope.row)"
              >课程详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="删除课程" align="center" width="100">
          <template slot-scope="scope">
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              style="margin: 0 15px"
              size="medium"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除当前课程记录吗？"
              @confirm="removeCourse(scope.row.id)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <!--  分页  -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!--  弹框 -->

    <!-- <el-dialog
      :visible.sync="editDialogFormVisible"
      title="修改课程信息"
      width="50%"
      @close="editDialogClosed"
      :append-to-body="true"
    >
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
    </el-dialog> -->
  </div>
</template>

<script>
//  引入control层去调用接口
import { filterDate } from "../../network/formatDate.js";

export default {
  filters: {
    filterDate,
    filterState(value) {
      switch (value) {
        case "ing":
          return "进行中";
          break;
        case "end":
          return "已结课";
          break;

        default:
          return "未开始";
      }
    },
  },
  props: {},
  data() {
    //子组件里面的值设置
    return {
      // 当前的页数
      pagenum: 1,
      // 当前每页显示多少条数据
      pagesize: 10,
      total: 0,
      editDialogFormVisible: false, //默认不展示弹框

      data: {},
      courselist: [],
      allcourse: [],
    };
  },
  mounted() {
    // 计算一共有几页
    this.total = Math.ceil(this.allcourse.length / this.pagesize);
    this.pageInation(this.pagenum, this.pagesize);
    // 计算得0时设置为1
    // this.total = this.total == 0 ? 1 : this.total;
    // this.handleSizeChange();
  },
  created() {
    this.getCourseList();
  },
  methods: {
    toCourseDetails(row) {
      sessionStorage.setItem("row", JSON.stringify(row));
      this.$store.commit("setCourserow", row);
      this.$router.push({
        name: "CourseDetails",
        params: {
          row,
        },
      });
    },
    handleRowdblclick(row, column, event) {
      console.log(row);
      console.log(column);
      console.log(event);
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.pagesize = newSize;
      this.pagenum = 1;
      this.pageInation(this.pagenum, this.pagesize);
    },

    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.pagenum = newPage;
      this.pageInation(this.pagenum, this.pagesize);
    },
    pageInation(pagenum, pagesize) {
      pagenum = pagenum ? pagenum : this.pagenum;
      pagesize = pagesize ? pagesize : this.pagesize;

      //每次点击更改页码值
      let begin = (this.pagenum - 1) * this.pagesize;
      let end = this.pagenum * this.pagesize;
      this.courselist = this.allcourse.slice(begin, end);
    },
    filterColor(state) {
      switch (state) {
        case "ing":
          return "success";
          break;
        case "end":
          return "danger";
          break;
        default:
          return "info";
      }
    },

    async removeCourse(id) {
      // console.log(id);
      await this.$http.post(`/api/cms/curs/1?_method=DELETE&id=${id}`).then((res) => {
        console.log(res);
        this.$message({
          message: "删除课程信息成功",
          type: "success",
        });

        // 重新获取用户列表数据
        this.getCourseList();
        this.pagenum = 1;
        this.pageInation(this.pagenum, this.pagesize);
      });
    },
    renderHeader(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("div", [
        h("span", column.label),
        h("i", {
          class: "el-icon-notebook-1",
          style: "color:#fd6c2e;margin-left:10px;",
        }),
      ]);
    },
    renderHeader1(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("div", [
        h("span", column.label),
        h("i", {
          class: "el-icon-user-solid",
          style: "color:#fd6c2e;margin-left:5px;",
        }),
      ]);
    },

    goAuditionDetail() {},
    transformatDate(time) {
      filterDate(time);
    },

    async getCourseList() {
      let that = this;
      await this.$http.post("/api/cms/curs/1?_method=GET").then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.allcourse = res.data.data;
          this.total = res.data.total;
        }
        let begin = (that.pagenum - 1) * that.pagesize;
        let end = that.pagenum * that.pagesize;
        that.courselist = that.allcourse.slice(begin, end);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.data-manage-table {
  .el-table__body-wrapper {
    overflow: scroll;
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
  .el-pagination {
    width: 800px;
    margin: 0 auto;
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

.course-center {
  font-size: 40px;
  text-align: center;
  -webkit-text-stroke: 1px #03fafa;
  -webkit-text-fill-color: transparent;
}
</style>
