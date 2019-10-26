import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import $ from 'jquery'

Vue.config.productionTip = false


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


Vue.prototype.$echarts = echarts;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import GetDataConfig from '@/assets/commonJS/GetDataConfig.js'
Vue.prototype.$GetData = GetDataConfig;
import FilterMethods from '@/assets/commonJS/FilterMethods.js'
Vue.prototype.$FilterData = FilterMethods.methods;
import TableMethods from '@/assets/commonJS/TableMethods.js'
Vue.prototype.$TableMethods = TableMethods;
import '@/assets/commonJS/dialog.js';
//设置后台项目名称
Vue.prototype.$WarmTable='table_war_exploded';