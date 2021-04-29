<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="coursename">{{ coursedetails.course_name }}</span>
      </div>
      <div class="text">
        <el-row :gutter="20">
          <el-col :span="6"
            ><span class="classname">{{
              "班级名称: " + coursedetailslist.class_name
            }}</span></el-col
          >
          <el-col :span="6"
            ><span>{{ "上课日期: " }}</span
            ><span>{{ coursedetails.weekday | filterDay }}</span></el-col
          >
          <el-col :span="6"
            ><span class="classtime">{{
              "上课时间: " + coursedetails.time_frame
            }}</span></el-col
          >
          <el-col :span="6"
            ><span class="classlocation">{{
              "上课地点: " + coursedetails.place
            }}</span></el-col
          >
        </el-row>
      </div>
      <div class="text">
        <el-row :gutter="20">
          <el-col :span="6"
            ><span class="classname">{{
              "班级人数: " + coursedetailslist.num_of_stu
            }}</span></el-col
          >
          <el-col :span="6"
            ><span class="classsize">{{
              "课程学分: " + coursedetailslist.credit
            }}</span></el-col
          >
          <el-col :span="6"
            ><span class="classtime">{{
              "所属学院: " + coursedetailslist.academy
            }}</span></el-col
          >
          <el-col :span="6"
            ><span class="classlocation">{{
              "任课老师: " + coursedetailslist.user_name
            }}</span></el-col
          >
        </el-row>
      </div>

      <el-table
        :data="studentlist"
        border
        stripe
        current-row-key
        id="out-table"
      >
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="70px"
        ></el-table-column>
        <el-table-column
          type="id"
          align="center"
          label="ID"
          prop="id"
          width="70px"
        ></el-table-column>
        <el-table-column
          sortable
          label="学生姓名"
          prop="student_name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学号"
          prop="student_no"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column label="性别" prop="gender" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.gender === 'male' ? 'success' : 'danger'"
              disable-transitions
              >{{ scope.row.gender == "male" ? "男" : "女" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="所在班级" prop="class_name" align="center">
          <template slot-scope="scope">
            <el-tag disable-transitions>{{ scope.row.class_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="学习情况" align="center">
          <!-- <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template> -->
          <template>
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-notebook-1" size="medium"
              >出勤信息</el-button
            >

            <el-button
              type="success"
              icon="el-icon-notebook-2"
              size="medium"
              style="margin: 0 15px"
              >抽查信息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5, 10, 20, 30, 50, 80, 100, 1000]"
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
export default {
  filters: {
    filterDay(value) {
      switch (value) {
        case "Mon":
          return "星期一";
          break;
        case "Tue":
          return "星期二";
          break;
        case "Wed":
          return "星期三";
          break;
        case "Thu":
          return "星期四";
          break;
        case "Fri":
          return "星期五";
          break;
        case "Sat":
          return "星期六";
          break;
        default:
          return "星期天";
      }
    },
  },
  data() {
    return {
      // 当前的页数
      pagenum: 1,
      // 当前每页显示多少条数据
      pagesize: 10,
      total: 0,
      allstudent: [],
      // 获取获取课程详细信息
      studentlist: [],
      coursedetailslist: {},
      coursedetails: {},
      // 获取用户列表的参数对象
      items: [
        { type: "", label: "标签一" },
        { type: "success", label: "标签二" },
        { type: "info", label: "标签三" },
        { type: "danger", label: "标签四" },
        { type: "warning", label: "标签五" },
      ],
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
        total: 0,
      },
      studentlist: [],

      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        // studyname: "",
        // studyno: "",
        // sex: "",
        rollcall: "未点名",
        spotcheck: "未抽查",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        studyname: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            message: "姓名的长度在1~6个字符之间",
            trigger: "blur",
          },
        ],
        studyno: [
          { required: true, message: "请输入9位数的学号", trigger: "blur" },
          {
            min: 9,
            max: 9,
            message: "请输入9位数的学号",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, trigger: "blur" }],
        rollcall: [
          { required: true, message: "请输入点名信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
        spotcheck: [
          { required: true, message: "请输入抽查信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
      }, // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        studyname: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            message: "姓名的长度在1~6个字符之间",
            trigger: "blur",
          },
        ],
        studyno: [
          { required: true, message: "请输入9位数的学号", trigger: "blur" },
        ],
        sex: [{ required: true, trigger: "blur" }],
        rollcall: [
          { required: true, message: "请输入点名信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
        spotcheck: [
          { required: true, message: "请输入抽查信息", trigger: "blur" },
          //   { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色Id值
      selectedRoleId: "",
    };
  },
  created() {
    // this.getStudentList();
    //this.pageInation(this.queryInfo.pagenum, this.queryInfo.pagesize);

    this.getCourseTimeList();
  },
  methods: {
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.pagesize = newSize;
      this.pagenum = 1;
      this.pageInation(this.pagenum, this.pagesize);
    },

    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.pageInation(this.pagenum, this.pagesize);
    },
    pageInation(pagenum, pagesize) {
      pagenum = pagenum ? pagenum : this.pagenum;
      pagesize = pagesize ? pagesize : this.pagesize;
      this.total = this.allstudent.length - 1;
      //每次点击更改页码值
      let begin = (this.pagenum - 1) * this.pagesize;
      let end = this.pagenum * this.pagesize;
      this.studentlist = this.allstudent.slice(begin, end);
    },
    async getCourseTimeList() {
      let that = this;
      // var row = this.$store.state.course_row;
      // var courseno = row.course_no;
      // var classname = row.class_name;
      var row = JSON.parse(sessionStorage.getItem("row"));
      // console.log(row);
      var courseno = row.course_no;
      var classname = row.class_name;
      this.coursedetailslist = row;

      const { data: res } = await this.$http.post(
        `/cms/coursetime/1?_method=GET&course_no=${courseno}`
      );
      const { data: res2 } = await this.$http.post(
        `/cms/class/1?_method=GET&class_name=${classname}`
      );
      var classno = res2.data[0].class_no;
      const { data: res3 } = await this.$http.post(
        `/cms/stu/1?_method=GET&class_no=${classno}`
      );
      const { data: res4 } = await this.$http.post(
        `/cms/coursetime/1?_method=GET`
      );
      //console.log(res);
      //console.log(res2);
      console.log(res4);

      this.$set(this.coursedetailslist, "academy", res2.data[0].academy);
      this.$set(this.coursedetailslist, "num_of_stu", res2.data[0].num_of_stu);
      this.coursedetails = res.data[0];

      this.allstudent = res3.data;
      this.total = res3.total;
      let begin = (that.pagenum - 1) * that.pagesize;
      let end = that.pagenum * that.pagesize;
      that.studentlist = that.allstudent.slice(begin, end);
      //console.log(this.coursedetails);
    },

    clearStudentList() {
      this.pageInation(this.pagenum, this.pagesize);
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.box-card {
  margin-bottom: 20px;
}
.clearfix {
  text-align: center;
  font-size: 20px;
}
.text {
  // margin: 10px 0;
  font-size: 20px;
  text-align: center;
  span {
  }
  .coursename {
    font-size: 40px;
    text-align: center;
    -webkit-text-stroke: 1px #03fafa;
    -webkit-text-fill-color: transparent;
  }
}
</style>
