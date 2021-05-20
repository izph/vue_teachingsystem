<template>
  <div>
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入学号或者姓名搜索" v-model="searchData" clearable @clear="clearData()" @keyup.enter.native="searchByno_Or_name(searchData)">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchByno_Or_name(searchData)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button
            type="success"
            @click="exportExcel('#outData', '出勤信息.xlsx')"
            >导出数据</el-button
          >
          <el-button type="danger" @click="getAttendence()"
            >显示所有学生</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="CurrentData" border style="width: 100%" id="outData">
        <el-table-column
          align="center"
          prop="student_name"
          label="名字"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="student_no"
          label="学号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="course_name"
          label="课程名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="weekday"
          label="上课时间"
          width="120"
        >
        </el-table-column>
        <el-table-column align="center" prop="week" label="周数" width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="attend"
          label="出席"
          width="120"
          :formatter="formatBoolean"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="leeve"
          label="请假"
          width="120"
          :formatter="formatBoolean"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="late"
          label="迟到"
          width="120"
          :formatter="formatBoolean"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="leave_early"
          label="早退"
          width="120"
          :formatter="formatBoolean"
        >
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
      //出勤数据
      AttendenceData: [],
      // 当前页面展示的出勤数据
      CurrentData:[],
      // 搜索内容
      searchData: null,
      //课程详细信息
      coursedetailslInfo: {},
    };
  },
  created() {
    this.getAttendence();
  },
  methods: {
    //获取该班级本课程的出勤
    async getAttendence() {
      var row = JSON.parse(sessionStorage.getItem("row"));
      this.coursedetailslInfo = row;
      await this.$http
        .post(
          `/api/cms/attn/2?_method=GET&course_no=${this.coursedetailslInfo.course_no}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.AttendenceData = res.data.data;
            this.CurrentData = this.AttendenceData
            // console.log(this.AttendenceData);
          }
        });
    },

    //通过学号或姓名搜索
    searchByno_Or_name(searchData){
      let chinese_pattern = new RegExp("[\u4E00-\u9FA5]+");
      // console.log(this.AttendenceData);     
      let property = chinese_pattern.test(searchData)?"student_name":"student_no";
      this.CurrentData = this.AttendenceData.filter(item => {
        return String(item[property]).search(searchData)!= -1;//模糊搜索  
        });
    },

    // 恢复默认数据
    clearData(){
      this.CurrentData = this.AttendenceData;
    },

    // 导出出勤数据
    exportExcel(id, title) {
      // 参数 id:dom；title:导出的文件名
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(document.querySelector(id));
      /* get binary string as output */
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          title
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    //格式化表格中的布尔值
    /*布尔值格式化：cellValue为后台返回的值
     */
    formatBoolean: function (row, column, cellValue) {
      if (cellValue) {
        return "是";
      } else {
        return "否";
      }
    },
  },
};
</script>
