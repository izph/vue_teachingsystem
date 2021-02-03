/**
 * 班级信息
 * 2019/9/15
 * @type {Mongoose}
 */
const mongoose = require("../utils/db");
const cm = new mongoose.Schema({
    coursename: {//班级名字
        type: String,
        required: true,
    },
    grade: {// 年级
        type: String,
        required: true,
    },
    courseno: {//班级序号
        type: Number,
        required: true,
    }
});
module.exports = mongoose.model("cm", cm, "coursemodel");