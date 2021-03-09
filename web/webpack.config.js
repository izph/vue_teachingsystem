const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack4')

module.exports = {
  mode: 'development', //用来指定构建模式   production项目上线
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  entry: path.join(__dirname, "./src/main.js"), //打包入口文件的路径
  output: {
    //publicPath: __dirname + "/dist/", // js引用路径或者CDN地址
    path: path.join(__dirname, "dist"), // 打包文件的输出目录   __dirname根目录
    filename: "bundle.js", //输出的文件名称
  }
};