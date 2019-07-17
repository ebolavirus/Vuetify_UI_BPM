let isNull = function (obj) {
  if (obj === null || typeof obj === 'undefined' || obj === '') {
    return true
  }
  return false
}
let mixins = {
  data: function () {
    return {}
  },
  methods: {
    alert (msg) {
      // let inf = this.getResource('alert.header.inf', this)
      let inf = this.$store.state.bpmcoreI18n.alert
      return this.$alert(msg, inf, {showClose: false})
      // return this.$alert(msg, {showClose: false})
    },
    tips (msg) {
      this.$notify({
        message: msg,
        duration: 5000 // ms
      })
    },
    getUuid () {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      var uuid = s.join('')
      return uuid
    },
    toLocaleDate (srcDate) {
      if (isNull(srcDate)) {
        return srcDate
      }
      var currDate = new Date()
      var timezoneOffSet = currDate.getTimezoneOffset() // 东八区-480

      srcDate = srcDate.replace(/-/g, '/')
      var d = new Date(srcDate)
      d.setMinutes(d.getMinutes() - timezoneOffSet)

      var year = d.getFullYear()
      var month = d.getMonth() + 1
      var day = d.getDate()
      var hour = d.getHours()
      var min = d.getMinutes()
      var sec = d.getSeconds()

      var dStr = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec

      return dStr
    },
    countDate (after, before) {
      if (isNull(after) || isNull(before)) {
        return ''
      }
      after = after.replace(/-/g, '/')
      before = before.replace(/-/g, '/')

      var afterDate = new Date(after)
      var beforeDate = new Date(before)

      var count = afterDate - beforeDate
      var cutDay = Math.floor(count / 1000 / 60 / 60 / 24)
      return cutDay
    },
    currentExplorer () {
      var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf('Opera') > -1
      // 判断是否Opera浏览器
      if (isOpera) {
        return 'opera'
      }
      // 判断是否Firefox浏览器
      if (userAgent.indexOf('Firefox') > -1) {
        return 'ff'
      }
      // 判断是否chorme浏览器
      if (userAgent.indexOf('Chrome') > -1) {
        return 'chrome'
      }
      // 判断是否Safari浏览器
      if (userAgent.indexOf('Safari') > -1) {
        return 'safari'
      }
      // 判断是否IE浏览器
      if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
        return 'ie'
      }
      // 判断是否Edge浏览器
      if (userAgent.indexOf('Trident') > -1) {
        return 'edge'
      }
    }
  }
}
export default mixins
