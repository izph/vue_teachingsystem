
module.exports = {

  devServer: {

    port: 8090,
    //配置是否自动启动浏览器
    open: true,

    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true, // 跨域访问设置，true代表跨域
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