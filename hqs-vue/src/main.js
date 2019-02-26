// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

//导入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//初始化执行权限判定
import "../src/utils/permission.js"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,     //注册路由
  store,      //注册store
  components: { App },
  template: '<App/>'
})
