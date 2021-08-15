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

// 前置守卫
router.beforeEach((to, from, next) => {
  // 去得页面是否需要登录
  if (to.meta.needLogin) {
    // 需要登录
    if (store.state.user) {
      // 登陆了,放行
      next()
    } else {
      // 未登录, 非法进入,去登录页
      next('/login?url=' + to.path)
    }
  } else {
    // 不需要登录
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
