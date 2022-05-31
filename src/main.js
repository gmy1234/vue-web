import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

// 远程引用 iconfont 图标
const sp = document.createElement('script')
sp.src = '//at.alicdn.com/t/font_3436004_1xgnyixqn78.js'

document.body.appendChild(sp)
new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
