// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mixin from './mixin'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.mixin(mixin);

Vue.config.productionTip = false;

Bmob.initialize("d906953dd3d938e25d240485f44c57bd", "e9c5aaa92fd184361486049d4fef2a8c");

// import '../node_modules/weui/dist/style/weui.css';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
