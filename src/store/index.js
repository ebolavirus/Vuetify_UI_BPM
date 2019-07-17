import Vue from 'vue'
import Vuex from 'vuex'
// bpmCore
import bpmCoreAction from './bpmCore/action'
import bpmCoreMutation from './bpmCore/mutation'
import bpmCoreState from './bpmCore/state'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    ...bpmCoreState
  },
  actions: {
    ...bpmCoreAction
  },
  mutations: {
    ...bpmCoreMutation
  }
})

export default store
