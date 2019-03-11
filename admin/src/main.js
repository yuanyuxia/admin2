// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import header from './components/header';
import menu from './components/nav'
import { http } from './http/http';
import common from './http/common'
import axios from 'axios';

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$http = http;
Vue.prototype.common = common;
Vue.prototype.$echarts = echarts;
Vue.prototype.axios=axios;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component('v-header',header);
Vue.component('v-menu',menu);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
