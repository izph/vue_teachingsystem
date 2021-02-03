/**
 * 学生模块
 */
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const com = require("../utils/common");
const path = require("path");
const { authStudent } = require("../utils/auth");
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, "../uploads") });
const mongoose = require("mongoose");
const pageSize = 6;//分页条数

//const student = require("../models/Student");
const mystudent = require("../models/MyStudent");

module.exports = function (app) {
    /**
     * fun:学生登录
     * url:"/api/mystudent/login"
     * type:post
     */
    router.post("/login", async (req, res) => {
        const user = req.body;
        //判断空数据
        if (user.studyno.trim().length === 0) {
            return res.json(com(false, "学号长度不能为0!", null));
        }
        if (user.password.trim().length === 0) {
            return res.json(com(false, "密码长度不能为0!", null));
        }
        //去数据库查询用户名

        //查询用户名是否存在
        //select * from admin where username="xxx";
        const result = await mystudent.findOne({ studyno: user.studyno });
        if (!result) {//不存在
            return res.json(com(false, "学号不存在", null));
        }
        //校验密码
        const isValid = (result.password === user.password);
        if (!isValid) {//密码校验失败
            return res.json(com(false, "密码错误!", null));
        }
        //校验通过返回token
        const token = jwt.sign({
            id: result._id,
            studyno: result.studyno,
            sex: result.sex
        }, require("../utils/private").privateKey, { expiresIn: 3600 });
        res.json(com(true, "登录成功!", token));
    });

    /**
     * fun:获取登录学生的信息
     * url:/api/mystudent/
     * type:GET
     */
    router.get("/", authStudent, async (req, res) => {
        res.json(com(true, null, {
            id: req.currentUser._id,
            studyno: req.currentUser.studyno,
            studyname: req.currentUser.studyname,
            sex: req.currentUser.sex,
        }));
    });

    /**
     * fun:更新学生信息
     * url:"/api/mystudent/info"
     * type:"put"
     */
    router.put("/info", authStudent, async (req, res) => {
        if (req.body.password) {//含有密码就更新密码
            const result = await mystudent.findByIdAndUpdate(req.body.id, req.body);
            if (!result) return res.json(com(false, "更新密码失败!", null));
        } else {
            let user = {};
            for (let key in req.body) {
                if (req.body[key]) {
                    user[key] = req.body[key];
                }
            }
            const result = await student.findByIdAndUpdate(user.id, user);
            if (!result) return res.json(com(false, "更新资料失败!", null));
        }
        res.json(com(true, "更新成功!", null));
    });

    //图片上传
    router.post("/uploads", authStudent, upload.single("file"), (req, res) => {
        const file = req.file;
        file.url = `http://127.0.0.1:8888/public/${file.filename}`;
        res.send(file);
    });

    //挂载路由
    app.use("/api/mystudent", router);
};





