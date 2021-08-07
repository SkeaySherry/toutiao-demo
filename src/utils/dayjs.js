import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用简体中文

dayjs.extend(relativeTime)

Vue.filter('filterTime', value => {
  return dayjs().to(dayjs(value))
})
