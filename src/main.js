import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import vuetify from './plugins/vuetify' // 引入第一步
import Vuetify from 'vuetify' // 引入第二部：还要引入这个才能用Vuetify

Vue.use(Vuetify) // 用 Vuetify

Vue.config.productionTip = false

// 远程引用 iconfont 图标
const sp = document.createElement('script')
sp.src = '//at.alicdn.com/t/font_3436004_1xgnyixqn78.js'

document.body.appendChild(sp)
new Vue({
  store,
  vuetify, // vue 挂载组件
  render: h => h(App),
}).$mount('#app')
