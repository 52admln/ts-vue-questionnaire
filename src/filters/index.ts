import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('formatTime', function (val: string | number) {
  return dayjs(
    String(val).length < 13
      ? Number(val) * 1000
      : Number(val)
  ).format('YYYY-MM-DD HH:mm:ss')
})
