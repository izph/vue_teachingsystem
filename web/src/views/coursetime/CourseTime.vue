<template>
  <div class="data-coursetime-table">
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 70%"
      border
      class="data-coursetime-item"
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
          <el-tag disable-transitions :type="success">{{
            scope.row.place
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//  引入control层去调用接口

export default {
  data() {
    //子组件里面的值设置
    return {
      tableData: [
        {
          course_no: "12010", //课程编号
          weekday: "Tue", //星期几
          time_frame: "2节", //上课时间段
          place: "404", //上课地点
          remark: 333, //备注
        },
        {
          course_no: "12010", //课程编号
          weekday: "Tue", //星期几
          time_frame: "2节", //上课时间段
          place: "404", //上课地点
          remark: 333, //备注
        },
        {
          course_no: "12010", //课程编号
          weekday: "Tue", //星期几
          time_frame: "2节", //上课时间段
          place: "404", //上课地点
          remark: 333, //备注
        },
        {
          course_no: "01201", //课程编号
          weekday: "Tue", //星期几
          time_frame: "2节", //上课时间段
          place: "101", //上课地点
          remark: 2222, //备注
        },
        {
          course_no: "1201", //课程编号
          weekday: "Tue", //星期几
          time_frame: "2节", //上课时间段
          place: "404", //上课地点
          remark: 1111, //备注
        },
      ],
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.data-coursetime-table {
  display: flex;
  justify-content: center;
}
.data-coursetime-item {
}
</style>
