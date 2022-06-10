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
import VueImageSwipe from "vue-image-swipe"; // 壁纸用的组件
import "highlight.js/styles/atom-one-dark.css";
import Share from "vue-social-share";
import "./assets/css/vue-social-share/client.css";
import "./assets/css/markdown.css";
import animated from "animate.css";


Vue.prototype.config = config
Vue.config.productionTip = false

Vue.use(Vuetify) // 用 Vuetify
Vue.use(Nprogress)
Vue.use(InfiniteLoading)
Vue.use(VueAxios,axios)
Vue.use(Toast)
Vue.use(VueImageSwipe)
Vue.use(Share)
Vue.use(animated)


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

Vue.filter("num", function(value) {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  }
  return value;
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

// 添加请求头：token
axios.interceptors.request.use(
    config =>{
      if (store.state.userToken !==''){
        config.headers['token'] = store.state.userToken
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }

)

document.body.appendChild(sp)
new Vue({
  router,
  store,
  vuetify, // vue 挂载组件
  render: h => h(App),
}).$mount('#app')
