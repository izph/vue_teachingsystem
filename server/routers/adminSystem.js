/**
 * 系统管理员模块
 */
const router = require("express").Router();
// 引入数据库集合
const AdminModel = require("../models/AdminModel");
const CModel = require("../models/CourseModel");
const MyStudent = require("../models/MyStudent");

const com = require("../utils/common");
const jwt = require("jsonwebtoken");
const { authAdmin } = require("../utils/auth");
const path = require("path");
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, "../uploads") });
//const mongoose = require("../utils/db");

module.exports = function (app) {
    /**
     *  fun:管理员登录
     *  url:/api/admin/login
     *  type:post
     */
    router.post("/login", async (req, res) => {
        const adminUser = req.body;
        //判断空数据
        if (adminUser.username.trim().length === 0) {
            return res.json(com(false, "用户名长度不能为0!", null));
        }
        if (adminUser.password.trim().length === 0) {
            return res.json(com(false, "密码长度不能为0!", null));
        }
        //去数据库查询用户名

        //查询用户名是否存在
        //select * from admin where username = "xxx";
        const result = await AdminModel.findOne({ username: adminUser.username });
        if (!result) {//不存在
            return res.json(com(false, "用户名不存在", null));
        }
        //校验密码
        const isValid = require("bcryptjs").compareSync(adminUser.password, result.password);
        if (!isValid) {//密码校验失败
            return res.json(com(false, "密码错误!", null));
        }
        //校验通过返回token
        const token = jwt.sign({
            id: result._id,
            username: result.username
        }, require("../utils/private").privateKey, { expiresIn: 3600 });
        res.json(com(true, "登录成功!", token));
    });

    /**
     *  fun:获取登录后管理员信息
     *  url:/api/admin/
     *  type:get
     *  comm:需要登录后才能访问
     */
    router.get("/", authAdmin, (req, res) => {
        res.json(com(true, null, {
            id: req.currentUser._id,
            username: req.currentUser.username,
            avatar: req.currentUser.avatar,
        }));
    });

    //图片上传
    router.post("/uploads", authAdmin, upload.single("file"), (req, res) => {
        const file = req.file;
        file.url = `http://127.0.0.1:8888/public/${file.filename}`;
        res.send(file);
    });

    /**
     *  fun:更新登录后管理员信息
     *  url:/api/admin/update
     *  type:put
     *  comm:需要登录后才能访问
     */
    router.put("/update", authAdmin, async (req, res) => {
        const admin = {};
        if (req.body.username) admin.username = req.body.username;
        if (req.body.password) admin.password = req.body.password;
        if (req.body.avatar) admin.avatar = req.body.avatar;
        const result = await AdminModel.findByIdAndUpdate(req.body.id, admin);
        if (!result) return res.json(com(false, "更新失败!", null));
        res.json(com(true, "更新成功!", result)); //返回一个对象
    });



    /**
     *  fun:获取课程信息
     *  url:/api/admin/course/:id
     *  type:get
     *  comm:需要登录后才能访问
     */

    router.get("/course", authAdmin, async (req, res) => {
        const cm = await CModel.find();
        res.json(com(true, "", cm));
    });
    // 加载学生信息
    router.get("/mystudent", authAdmin, async (req, res) => {
        const ms = await MyStudent.find();
        res.json(com(true, "", ms));
    });
    // 添加学生
    router.post("/addmystudent", authAdmin, async (req, res) => {
        const ams = await MyStudent.create(req.body);
        if (!ams) {  //添加失败
            return res.json(com(false, "添加失败,请稍后再试!", null));
        }
        res.json(com(true, "添加成功!", ams));
    });

    //删除学生：
    router.delete('/removemystudent/:studyno', authAdmin, async (req, res) => {
        const rms = await MyStudent.remove({ studyno: req.params.studyno });
        //返回
        res.json(com(true, "删除成功!", rms));
    })
    //回显学生详细信息用于修改：
    router.get('/getupdatemystudent/:studyno', authAdmin, async (req, res) => {
        const gms = await MyStudent.findOne({ studyno: req.params.studyno })
        res.json(com(true, "", gms));
    })

    router.put('/updatemystudent', authAdmin, async (req, res) => {
        const ums = await MyStudent.findByIdAndUpdate(req.body._id, req.body)
        res.json(com(true, "修改成功", ums));  //返回一个对象
    })
    // 学生信息分页
    router.get('/studentListPage', authAdmin, async (req, res) => {
        var result = {
            data: [],
            total: '',
            pageSize: 0,
            currentPage: 0
        };

        result.total = await MyStudent.find({}).count();

        var pageSize = parseInt(req.query.pageSize);
        var currentPage = parseInt(req.query.currentPage);
        result.pageSize = parseInt(req.query.pageSize);
        result.currentPage = parseInt(req.query.currentPage);
        //对结果默认排序
        result.data = await MyStudent.find().skip((currentPage - 1) * pageSize).limit(pageSize);
        res.json(com(true, "", result));
    })

    router.get('/searchstudentList', authAdmin, async (req, res) => {
        var query = new RegExp(req.query.currentquery)
        const ssl = await MyStudent.find({ studyname: query })
        res.json(com(true, "", ssl));

    });

    //挂载路由
    app.use("/api/admin", router);
};
