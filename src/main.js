import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import router from './router'
import vuetify from './plugins/vuetify' // 引入第一步
import Vuetify from 'vuetify' // 引入第二部：还要引入这个才能用Vuetify
import Nprogress from "nprogress" // 进度条
import "nprogress/nprogress.css"
import './assets/css/index.css'
import dayjs from "dayjs"
import InfiniteLoading from "vue-infinite-loading" // 无限加载
import axios from "axios";
import VueAxios from "vue-axios";
import config from "@/assets/js/config";
import Toast from "./components/toast/index";

Vue.prototype.config = config
Vue.config.productionTip = false

Vue.use(Vuetify) // 用 Vuetify
Vue.use(Nprogress)
Vue.use(InfiniteLoading)
Vue.use(VueAxios,axios)
Vue.use(Toast)


Vue.filter("date", function(value) {
  return dayjs(value).format("YYYY-MM-DD");
});

Vue.filter("year", function(value) {
  return dayjs(value).format("YYYY");
});

Vue.filter("hour", function(value) {
  return dayjs(value).format("HH:mm:ss");
});

Vue.filter("time", function(value) {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
});

// 远程引用 iconfont 图标
const sp = document.createElement('script')
sp.src = '//at.alicdn.com/t/font_3436004_1xgnyixqn78.js'

router.beforeEach((to, from, next) => {
  Nprogress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
  Nprogress.done();
});

document.body.appendChild(sp)
new Vue({
  router,
  store,
  vuetify, // vue 挂载组件
  render: h => h(App),
}).$mount('#app')
