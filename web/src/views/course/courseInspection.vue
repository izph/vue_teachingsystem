<template>
  <div>
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入学号搜索" v-model="student_no" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchInspectionbyStu_no(student_no)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="success" @click="exportExcel('#outData', '抽查数据')"
            >导出数据</el-button
          >
          <el-button type="danger" @click="getInspection()">显示所有学生</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="InspectionData" border style="width: 100%" id="outData">
        <el-table-column align="center" prop="student_name" label="名字" width="280">
        </el-table-column>
        <el-table-column align="center" prop="student_no" label="学号" width="280">
        </el-table-column>
        <el-table-column align="center" prop="course_name" label="课程名" width="280">
        </el-table-column>
        <el-table-column align="center" prop="score" label="抽查得分" width="280">
        </el-table-column>
        <el-table-column align="center" prop="week" label="具体周数" width="280">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      // 抽出数据
      InspectionData: [],
      // 搜索的学号
      student_no: null,
    };
  },
  created() {
    this.getInspection();
  },
  methods: {
    //获取该班级本课程的抽查
    async getInspection() {
      var row = JSON.parse(sessionStorage.getItem("row"));
      this.coursedetailslInfo = row;
      // console.log(this.coursedetailslInfo);
      await this.$http
        .post(
          `/api/cms/inspect/1?_method=GET&course_no=${this.coursedetailslInfo.course_no}`
        )
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.InspectionData = res.data.data;
            // console.log(this.AttendenceData);
          }
        });
    },
    // 搜索by学号
    async searchInspectionbyStu_no(no) {
      await this.$http
        .post(
          `/api/cms/inspect/2?_method=GET&course_no=${this.coursedetailslInfo.course_no}&student_no=${this.student_no}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.InspectionData = res.data.data;
            console.log(this.InspectionData);
          }
        });
    },
    // 导出出勤数据
    exportExcel(id, title) {
      // 参数 id:dom；title:导出的文件名
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(document.querySelector(id));
      /* get binary string as output */
      const wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "array" });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: "application/octet-stream" }), title);
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
};
</script>
