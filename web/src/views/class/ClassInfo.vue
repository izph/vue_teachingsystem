<template>
  <div class="classinfo-container">
    <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
      <el-table-column prop="class_id" label="班级ID" align="center" width="80">
      </el-table-column>
      <el-table-column prop="class_no" label="班级编号" align="center">
      </el-table-column>
      <el-table-column
        prop="class_name"
        label="班级名称"
        sortable
        align="center"
        column-key="class_name"
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <el-tag :type="'warning'" disable-transitions>{{
            scope.row.class_name
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        width="100"
        prop="num_of_stu"
        label="学生人数"
        align="center"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="grade"
        label="年级"
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
        <template slot-scope="scope">
          <el-tag :type="'primary'" disable-transitions>{{
            scope.row.grade
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="academy"
        label="学院"
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
        <template slot-scope="scope">
          <el-tag :type="'success'" disable-transitions>{{
            scope.row.academy
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          class_id: 1, // 班级id
          academy: "数学科学学院", // 学院
          grade: "2017级", // 年级
          class_no: "20170002", // 班级编号
          class_name: "2017级(2)班", // 班级名称
          num_of_stu: 54, // 学生人数
          remark: "无", // 备注
        },
        {
          class_id: 1, // 班级id
          academy: "数学科学学院", // 学院
          grade: "2017级", // 年级
          class_no: "20170002", // 班级编号
          class_name: "2017级(2)班", // 班级名称
          num_of_stu: 54, // 学生人数
          remark: "无", // 备注
        },
        {
          class_id: 2, // 班级id
          academy: "工商管理学院", // 学院
          grade: "2018级", // 年级
          class_no: "20180005", // 班级编号
          class_name: "2018级(5)班", // 班级名称
          num_of_stu: 60, // 学生人数
          remark: "null", // 备注
        },
        {
          class_id: 2, // 班级id
          academy: "工商管理学院", // 学院
          grade: "2018级", // 年级
          class_no: "20180005", // 班级编号
          class_name: "2018级(5)班", // 班级名称
          num_of_stu: 60, // 学生人数
          remark: "null", // 备注
        },
        {
          class_id: 3, // 班级id
          academy: "经济与金融学院", // 学院
          grade: "2017级", // 年级
          class_no: "20170007", // 班级编号
          class_name: "2017级(7)班", // 班级名称
          num_of_stu: 44, // 学生人数
          remark: "无", // 备注
        },
        {
          class_id: 4, // 班级id
          academy: "工学院", // 学院
          grade: "2019级", // 年级
          class_no: "20190012", // 班级编号
          class_name: "2017级(12)班", // 班级名称
          num_of_stu: 68, // 学生人数
          remark: "无", // 备注
        },
      ],
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("class_name");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.num_of_stu;
    },
    filterGrade(value, row) {
      return row.grade === value;
    },
    filterAcademy(value, row) {
      return row.academy === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>
<style>
</style>