// 全组件属性
function sortFunc (x, y) {
  let xvalue = x.unit
  let yvalue = y.unit
  if (!xvalue && !yvalue) {
    return 0
  }
  if (!xvalue) {
    return -1
  }
  if (!yvalue) {
    return 1
  }
  let xint = Number.parseInt(xvalue)
  let yint = Number.parseInt(yvalue)
  return yint - xint
}

function clearTreeData (atreedata) {
  let treeData = atreedata.sort(sortFunc)
  let cacheJson = {}
  for (let i = treeData.length - 1; i >= 0; i--) {
    if (treeData[i].isHidden || !treeData[i].pId || treeData[i].id === '00000001') {
      // treeData.splice(i, 1)
    } else {
      treeData[i].childIds = []
      cacheJson[treeData[i].id] = treeData[i]
    }
  }
  return cacheJson
}
function initTreePathByCode (middleTreeData, aId) {
  if (!middleTreeData[aId]) {
    return null
  }
  if (middleTreeData[aId].pId === '00000001') {
    middleTreeData[aId].parentPath = ['00000001']
    return ['00000001']
  } else {
    let cacheResult = initTreePathByCode(middleTreeData, middleTreeData[aId].pId)
    if (cacheResult === null) {
      console.log('init Tree ERROR when aID is:', aId)
      return null
    }
    cacheResult.push(middleTreeData[aId].pId)
    middleTreeData[aId].parentPath = cacheResult
    return cacheResult
  }
}

function initAllTreePath (middleTreeData) {
  for (let i in middleTreeData) {
    initTreePathByCode(middleTreeData, i)
  }
  return middleTreeData
}

function makeupTheChilds (middleTreeData, item) {
  let cacheChild = Object.assign({}, item)
  if (!item.childIds || item.childIds.length <= 0) {
    return cacheChild
  }
  cacheChild.children = []
  for (let i in item.childIds) {
    cacheChild.children.push(makeupTheChilds(middleTreeData, item.childIds[i]))
  }
  return cacheChild
}

export function initTreeArray (atreeData) {
  return initAllTreePath(clearTreeData(atreeData))
}

export function makeTreeJsonByData (middleTreeData) {
  let treeJson = {'isHidden': false, 'pId': '0', 'id': '00000001', 'name': '万华集团', children: []}
  for (let i in middleTreeData) {
    if (middleTreeData[i].pId === '00000001') {
      treeJson.children.push(middleTreeData[i])
    } else if (!middleTreeData[middleTreeData[i].pId]) {
      continue
    } else {
      middleTreeData[middleTreeData[i].pId].childIds.push(middleTreeData[i])
    }
  }
  for (let j in treeJson.children) {
    treeJson.children[j] = makeupTheChilds(middleTreeData, treeJson.children[j])
  }
  console.log('--------.....tree json computed success..')
  // console.log(treeJson)
  return treeJson
}
