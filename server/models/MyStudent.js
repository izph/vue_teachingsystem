/**
 * Student model
 * 2019/10/22
 * ymcj
 */
const mongoose = require("../utils/db");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    studyname: {
        type: String,
        require: true
    },
    studyno: {
        type: Number
    },
    password: {
        type: String,
    },
    sex: {
        type: String,
    },
    rollcall: {
        type: String,
    },
    spotcheck: {
        type: String
    },

});
module.exports = mongoose.model("mystudents", StudentSchema, "mystudent");
