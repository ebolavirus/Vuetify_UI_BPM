import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import minxins from './mixin'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import wanhuabutton1 from './components/testButton1'
import wanhuabutton2 from './components/testButton2'
import './style/index.css'
Vue.use(ElementUI)
Vue.component(wanhuabutton1.name, wanhuabutton1)
Vue.component(wanhuabutton2.name, wanhuabutton2)

minxins.forEach(item => {
  Vue.mixin(item)
})
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
router.replace('/BPMCore/type=draft&lang=en&hsInput=%7B%22appAcronym%22%3A%22MTV3%22%2C%22bpdName%22%3A%22MobileTestV3%22%2C%22deptPath%22%3A%22%2F00000001%2FHR00000001%2FHR00000045%2FHR00000381%22%2C%22ts_piid%22%3A%22-1%22%2C%22ts_taskId%22%3A%22-1%22%2C%22isDraft%22%3Atrue%2C%22creator%22%3A%7B%22orgId%22%3A%22HR00000001%22%2C%22employeeNumber%22%3A%2200007989%22%2C%22userId%22%3A%22gyren%22%2C%22userName%22%3A%22%E4%BB%BB%E9%AB%98%E5%8B%87%28gyren%29%22%2C%22deptId%22%3A%22HR00000381%22%2C%22deptName%22%3A%22%2F%E4%B8%87%E5%8D%8E%E9%9B%86%E5%9B%A2%2F%E4%B8%87%E5%8D%8E%E5%8C%96%E5%AD%A6%E9%9B%86%E5%9B%A2%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%2F%E4%BF%A1%E6%81%AF%E4%B8%AD%E5%BF%83%2F%E5%8D%8F%E5%90%8C%E5%8A%9E%E5%85%AC%22%2C%22deptNameEn%22%3A%22%22%2C%22mobile%22%3A%2218153517096%22%2C%22officePhone%22%3A%22%22%2C%22postId%22%3A%2200016235%22%2C%22postName%22%3A%22IT%E5%B7%A5%E7%A8%8B%E5%B8%88%22%2C%22postNameEn%22%3A%22%22%7D%2C%22activityId%22%3A%22bpdid%3Adfe7596c299a0b82%3A-5df335df%3A14ea9b6462b%3A6181%22%7D')