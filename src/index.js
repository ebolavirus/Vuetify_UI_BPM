import attachment from './components/bpmCore/attachment'
import bpmpersonchoose from './components/bpmCore/bpmpersonchoose'
import bpmprocesslayout from './components/bpmCore/bpmprocesslayout'

import bpmCoreAction from './store/bpmCore/action'
import bpmCoreMutation from './store/bpmCore/mutation'
import bpmCoreState from './store/bpmCore/state'
import minxins from './mixin'

const bpmCoreItem = {
  install (Vue, options) {
    Vue.component(bpmpersonchoose.name, bpmpersonchoose)
    Vue.component(attachment.name, attachment)
    Vue.component(bpmprocesslayout.name, bpmprocesslayout)
    minxins.forEach(item => {
      Vue.mixin(item)
    })
  },
  bpmCoreAction,
  bpmCoreMutation,
  bpmCoreState
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(bpmCoreItem)
}
export default bpmCoreItem
