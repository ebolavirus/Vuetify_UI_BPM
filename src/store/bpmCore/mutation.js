'use strict'

let mutations = {}
mutations.setBpmValue = function (state, ainput) {
  if (!ainput.akey) {
    console.log('setBpmValue ERRORRRRRRRRRRRRRRRRRRRRRRRRR', ainput)
    return
  }
  if (ainput.akey.indexOf('.') > -1) {
    let keyarray = ainput.akey.split('.')
    let cacheJson = state
    for (let i = 0; i < keyarray.length; i++) {
      if (i < keyarray.length - 1) {
        cacheJson = cacheJson[keyarray[i]]
      } else {
        cacheJson[keyarray[i]] = ainput.avalue
      }
    }
  } else {
    // let keyarray = ainput.akey.split('.')
    // let cacheJson = state
    // cacheJson[keyarray[0]] = ainput.avalue
    state[ainput.akey] = ainput.avalue
  }
}
export default mutations
