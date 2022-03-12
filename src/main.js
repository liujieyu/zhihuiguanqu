import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import router from './router'
import store from './store'
// import $ from 'jquery'

Vue.config.productionTip = false

import cookie from "js-cookie"
Vue.prototype.Cook = cookie


import axios from 'axios';
Vue.prototype.axios = axios;


//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition)

//iview
import iView from 'iview';	
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//echarts
import echarts from 'echarts';
import 'echarts-gl';

import './table/table.css';

Vue.prototype.$echarts = echarts;
import 'babel-polyfill'
axios.interceptors.request.use(
  config => {
      if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers['authorization'] = 'authorization' + localStorage.token;
      }
      return config
  },
  err => {
      return Promise.reject(err)
})

new Vue({
  router,
  store,
  components: { App,Home },
  render: h => h(App)
}).$mount('#app')

import GetDataConfig from '@/assets/commonJS/GetDataConfig.js'
Vue.prototype.$GetData = GetDataConfig;
import FilterMethods from '@/assets/commonJS/FilterMethods.js'
Vue.prototype.$FilterData = FilterMethods.methods;
import TableMethods from '@/assets/commonJS/TableMethods.js'
Vue.prototype.$TableMethods = TableMethods;
import '@/assets/commonJS/dialog.js';
import Table from '@/page/Table.vue'
Vue.prototype.$Table = Table;
//设置后台项目名称
Vue.prototype.$WarmTable='table_war_exploded';