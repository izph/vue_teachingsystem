/**
 *  管理员表
 *  2019/9/12
 * @type {Mongoose}
 */
const mongoose = require("../utils/db");
const Schema = mongoose.Schema;
const AdminModel = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    /**
    * 加密处理 - 同步方法
    *   bcryptjs.hashSync(value, salt)
    *    - value  要加密的数据
    *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
    */
    set(value) {
      return require("bcryptjs").hashSync(value, 10);
      /** * 注意：每次调用输出都会不一样 */
    }
  },
  avatar: {
    type: String,
  }
});


module.exports = mongoose.model("Admin", AdminModel, "admin");


