import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import axios from 'axios';
import { Lazyload,Toast } from 'vant';
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});

import '@/util/filter.js';
import store from '@/store/carStore.js';

//自定义变量在Vue.prototype上
Vue.prototype.$api = axios;
Vue.prototype.$toast = Toast;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
