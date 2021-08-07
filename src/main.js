import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// 加载注册 Vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载 amfe-flexible
import 'amfe-flexible'
// 加载处理时间的过滤器
import '@/utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
