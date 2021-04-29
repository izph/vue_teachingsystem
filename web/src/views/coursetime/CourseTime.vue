<template>
  <div class="data-coursetime-table">
    <el-card>
      <div style="text-align: center">
        <span class="course-center">所有课程上课时间表</span>
      </div>
      <el-table
        ref="filterTable"
        :data="courseTableData"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          prop="course_no"
          label="课程编号"
          width="300"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="weekday"
          label="weekday"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="time_frame"
          label="上课时间段"
          sortable
          width="180"
          column-key="time_frame"
          align="center"
          :filters="[
            { text: '1-2节', value: '2016-05-01' },
            { text: '3-4节', value: '2016-05-02' },
            { text: '7-8节', value: '2016-05-03' },
            { text: '9-10节', value: '2016-05-04' },
            { text: '11-12节', value: '2016-05-04' },
            { text: '11-13节', value: '2016-05-04' },
          ]"
          :filter-method="filterHandler"
        >
        </el-table-column>

        <el-table-column
          prop="place"
          label="上课地点"
          width="300"
          column-key="place"
          align="center"
          :filters="[
            { text: '101', value: '101' },
            { text: '404', value: '404' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag disable-transitions :type="'success'">{{
              scope.row.place
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注" align="center">
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
  </div>
</template>

<script>
//  引入control层去调用接口

export default {
  data() {
    //子组件里面的值设置
    return {
      total: 0,
      pagenum: 1,
      pagesize: 10,
      courseTableData: [],
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },

    filterTag(value, row) {
      return row.place === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    async getCourseTime() {
      await this.$http
        .post("/cms/coursetime/1?_method=GET&course_no=")
        .then((res) => {
          this.courseTableData = res.data.data;
          this.total = res.data.total;
        });
    },
  },
  created() {
    this.getCourseTime();
  },
};
</script>

<style lang="scss" scoped>
.data-coursetime-table {
  // display: flex;
  // justify-content: center;
  width: 100%;
}
.data-coursetime-item {
}
.course-center {
  font-size: 40px;
  text-align: center;
  -webkit-text-stroke: 1px #65beff;
  -webkit-text-fill-color: transparent;
}
.el-pagination {
  width: 800px;
  margin: 0 auto;
}
</style>
