
const path = require('path');
var env = process.env.NODE_ENV
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 上面代码貌似没用上，不过不碍事

module.exports = {

  //基本路径
  //baseUrl: './', //加 ./ 解决404问题
  outputDir: 'dist',
  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: 'static',
  //以多页模式构建应用程序。
  pages: undefined,
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  parallel: require('os').cpus().length > 1,
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  // lintOnSave: false,

  // 是否为生产环境构建生成 source map？这样打包的dist文件体积会很小（正式版）
  //为true带测试环境，提交会大很多
  productionSourceMap: false,

  publicPath: './',

  devServer: {

    port: 8090,
    //配置是否自动启动浏览器
    open: true,
    //publicPath: '../',  //这里解决静态资源引用路径问题   是上线所需的额外配置，本地测试的需要需要注释掉
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true, // 跨域访问设置，true代表跨域
        ws: true, // 是否启用websockets
        pathRewrite: { // 路径改写规则
          '^/api': '' // /api替换成''
        },
        //   cookieDomainRewrite: {
        //     '47.94.225.225': 'localhost'
        //   }
        // }
        // '/': {
        //   target: 'http://47.94.225.225',
        //   changeOrigin: true, // 跨域访问设置，true代表跨域

        //   // cookieDomainRewrite: {
        //   //   '47.94.225.225': 'localhost'
        //   // }
        // }
      }

    }
  }
}