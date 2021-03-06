import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import "../public/css/reset.css"
import '../public/css/global.css'
import "../public/layui/css/layui.css";
// 导入字体图标
import './assets/fonts/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueCookies from 'vue-cookies';




Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCookies)

import axios from "./network/http.js"
//挂载到vue原型对象上
Vue.prototype.$http = axios;

// Vue.mixin({
//   methods: {
//     getAuthHeaders() {
//       return {
//         Authorization: `Bearer ${localStorage.token || ""}`
//       }
//     }
//   }
// });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
