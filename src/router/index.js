import Vue from 'vue'
import Router from 'vue-router'
import BPMCore from '../test/BPMCore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/BPMCore/:param',
      name: 'BPMCore',
      component: BPMCore
    }
  ]
})
