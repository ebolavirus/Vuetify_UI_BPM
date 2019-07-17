'use strict'
import bpmcoreI18nZh from '../../language/bpmCore/bpmcore_i18n_zh'
import bpmcoreI18nEn from '../../language/bpmCore/bpmcore_i18n_en'
import bpmcoreI18nHu from '../../language/bpmCore/bpmcore_i18n_hu'

let actions = {}

actions.setBpmValue = function ({commit}, abusi) {
  commit('setBpmValue', abusi)
}
// 初始化url入参，每个页面都需要调用,load resource
actions.loadResource = function (store, paramObj) {
  // 1.init url params
  let urlParam = paramObj.me.$route.params.param
  let hsInput = {}
  let readOnly = true
  let lang = store.state.langEnum.zh // 默认中文
  console.log('---lang----', lang)
  console.log('---param----', urlParam)
  let paramsArray = urlParam.split('&')
  for (let i = 0; i < paramsArray.length; i++) {
    let paramPair = paramsArray[i].split('=')
    console.log('paramPair->', paramPair)
    if (paramPair[0] === 'type') {
      store.commit('setBpmValue', {akey: 'flowType', avalue: paramPair[1]})
      if (paramPair[1] === 'view') {
        readOnly = 'READONLY'
      } else {
        readOnly = ''
      }
    }
    if (paramPair[0] === 'hsInput') {
      // 该部分与工作台拼接参数约定格式，将&替换为36DE;
      paramPair[1] = paramPair[1].replace(/36DE;/g, '&')
      hsInput = JSON.parse(paramPair[1])
      store.commit('setBpmValue', {akey: 'hsInput', avalue: hsInput})
      console.log('hsInput->', hsInput)
    }
    if (paramPair[0] === 'lang') {
      lang = paramPair[1]
      store.commit('setBpmValue', {akey: 'lang', avalue: paramPair[1]})
      console.log('lang->', paramPair[1])
    }
    if (paramPair[0] === 'userId') {
      store.commit('setBpmValue', {akey: 'userId', avalue: paramPair[1]})
      console.log('userId->', paramPair[1])
    }
  }
  // 2. load bpmcorei18n
  console.log('lang----->', lang)
  if (lang === store.state.langEnum.en) {
    store.commit('setBpmValue', {akey: 'bpmcoreI18n', avalue: bpmcoreI18nEn})
  } else if (lang === store.state.langEnum.hu) {
    store.commit('setBpmValue', {akey: 'bpmcoreI18n', avalue: bpmcoreI18nHu})
  } else {
    store.commit('setBpmValue', {akey: 'bpmcoreI18n', avalue: bpmcoreI18nZh})
  }
  console.log('load resource bpmcoreI18n -->', store.state.bpmcoreI18n)
  // console.log('load resource otherI18n -->', store.state.otherI18n)
  // 4.load resource
  let input = {}
  input.ts_piid = hsInput.ts_piid
  input.ts_taskId = hsInput.ts_taskId
  if (hsInput.appAcronym) {
    input.appAcronym = hsInput.appAcronym
  }
  if (hsInput.bpdName) {
    input.bpdName = hsInput.bpdName
  }
  if (hsInput.activityId) {
    input.activityId = hsInput.activityId
  }
  if (hsInput.deptPath) {
    input.deptPath = hsInput.deptPath
  }
  if (hsInput.isDraft) {
    input.isDraft = hsInput.isDraft
  }
  if (hsInput.creator) {
    input.creator = {}
    input.creator.userId = hsInput.creator.userId
    input.creator.userName = hsInput.creator.userName
    input.creator.employeeNumber = hsInput.creator.employeeNumber
    input.creator.deptId = hsInput.creator.deptId
    input.creator.deptName = hsInput.creator.deptName
    input.creator.deptNameEn = hsInput.creator.deptNameEn
    input.creator.orgId = hsInput.creator.orgId
    input.creator.mobile = hsInput.creator.mobile
    input.creator.officePhone = hsInput.creator.officePhone
  }
  console.log('load resource input:', input)
  console.log('load resource string:', readOnly)
  paramObj.me.httpBpmCore({
    'input': input,
    'readOnly': readOnly,
    'async': false,
    'apiName': 'EBCA_V3@AJAX_loadResources_V3'
  }, data => {
    console.log('load resource data-> ', data)
    if (data.returnCode === '90000210') {
      paramObj.me.alert(store.state.bpmcoreI18n.msgTaskHasBeenFinieshd)
      return
    }
    store.commit('setBpmValue', {akey: 'tsId', avalue: data.inst.id})
    store.commit('setBpmValue', {akey: 'task', avalue: data.task})
    store.commit('setBpmValue', {akey: 'inst', avalue: data.inst})
    store.commit('setBpmValue', {akey: 'activity', avalue: data.activity})
    if (data.task && data.task.userId) {
      store.commit('setBpmValue', {akey: 'userId', avalue: data.task.userId}) // 起草审批在此赋值userId，只读页面从ur获取
    }
    // 1.receieve time,异步调用
    let status = ''
    let taskId
    if (data.task) {
      status = data.task.status
      taskId = data.task.taskId
    }
    console.log('do not need receieve time->', !status || (status === '12' || taskId === -1))
    if (!status || (status === '12' || taskId === -1)) {
      // do not receieve time
    } else {
      paramObj.me.httpBpmCore({
        'taskId': data.task.taskId,
        'ts_taskId': data.task.id,
        'async': true,
        'apiName': 'EBCA_V3@AJAX_receiveTask_V3'
      }, data2 => {
        console.log('receieve time success-> data :', data2)
      }, (data2) => {
        console.log('receieve time error-> data :', data2)
        paramObj.me.tips('Receive task error!')
      })
    }
    // 2. 加载审批历史
    if (!(hsInput.ts_piid && hsInput.ts_piid === '-1')) {
      paramObj.me.httpBpmCore({
        'tsPiid': data.inst.id,
        'async': true,
        'apiName': 'EBTA@RetrieveTaskDones_R2'
      }, data => {
        console.log('currStatus', JSON.parse(data.result.currStatus))
        console.log('taskDones', JSON.parse(data.result.taskDones))
        store.commit('setBpmValue', {akey: 'currStatus', avalue: JSON.parse(data.result.currStatus)})
        store.commit('setBpmValue', {akey: 'taskDones', avalue: JSON.parse(data.result.taskDones)})
      }, (data) => {
      }, (data) => {
      })
    }
    // 3. 判断并加载帮助文档，如果有则显示帮助按钮，如果没有就不显示帮助按钮，异步调用请求
    let helpUrl = ''
    let host = window.location.protocol + '//' + window.location.host
    console.log('host----->', host)
    if (host.indexOf('localhost:80') > -1) {
      host = 'http://bpmdev02.whchem.com' // 本地调试链接开发，需要登录或者单点
    }
    if (lang && lang.toLowerCase() === 'zh') {
      helpUrl = host + '/webasset/helpDoc/' + hsInput.bpdName + '_zh' + '.htm'
    } else {
      helpUrl = host + '/webasset/helpDoc/' + hsInput.bpdName + '_en' + '.htm'
    }
    let isHelpFileExist = false
    paramObj.me.httpBase({
      type: 'head',
      timeout: 5000,
      'url': helpUrl,
      'async': true
    }, data => {
      if (data && data.response && data.response.statusCode  && data.response.statusCode + '' === '404') {
        // not found
        isHelpFileExist = false
        console.log('isHelpFileExist data isHelpFileExist>>>>', isHelpFileExist)
        store.commit('setBpmValue', {akey: 'isHelpFileExist', avalue: isHelpFileExist})
      } else {
        isHelpFileExist = true
        console.log('isHelpFileExist data isHelpFileExist>>>>', isHelpFileExist)
        store.commit('setBpmValue', {akey: 'showHelpUrl', avalue: helpUrl})
        store.commit('setBpmValue', {akey: 'isHelpFileExist', avalue: isHelpFileExist})
      }
    }, (data, e) => {
      isHelpFileExist = false
      console.log('isHelpFileExist data error>>>>', data)
      store.commit('setBpmValue', {akey: 'isHelpFileExist', avalue: isHelpFileExist})
    })
    // load resouce success end
  }, () => {
    paramObj.me.tips('load instance and task failed!!')
  })
}
actions.saveDraft = function (store, paramObj) {
  console.log('save draft -> task :', paramObj.me.task)
  console.log('save draft -> inst :', paramObj.me.inst)
  paramObj.me.httpBpmCore({
    'task': paramObj.me.task,
    'inst': paramObj.me.inst,
    'async': false,
    'apiName': 'EBCA_V3@AJAX_saveDraft_V3'
  }, data => {
    console.log('save draft -> data :', data)
    paramObj.me.tips(paramObj.me.bpmcoreI18n.msgSaveSuccess)
  }, () => {
    paramObj.me.tips(paramObj.me.bpmcoreI18n.msgSaveFailure)
  })
}
actions.startProcess = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'userId': paramObj.me.task.userId,
    'bpdUri': paramObj.me.hsInput.appAcronym + '@' + paramObj.me.hsInput.bpdName,
    'tsPiid': paramObj.me.inst.id,
    'targetUsers': paramObj.me.targetUsers,
    'comments': paramObj.me.comments,
    'isStartProc': paramObj.me.isStartProc,
    'bizData': paramObj.me.bizData,
    'async': false,
    'apiName': 'EBTA@StartProcess_R2'
  }, data => {
    console.log('isStartProc', paramObj.me.isStartProc)
    console.log('tsId', paramObj.me.tsId)
    store.commit('setBpmValue', {akey: 'tsId', avalue: data.result.tsPiid})
    // 弹框需要解析结果，真正发起流程不需要，因为真正发起没有target
    if (!paramObj.me.isStartProc) {
      let target = JSON.parse(data.result.target)
      if (paramObj.me.completeTaskType.completeTaskTypeFail === target.completeTaskType) {
        // fail get activity user
        paramObj.me.alert(paramObj.me.bpmcoreI18n.RESP_ERROR_930003)
        paramObj.me.setBpmValue({akey: 'isSubmitVerify', avalue: false})
        paramObj.me.setBpmValue({akey: 'isConfirmVerify', avalue: false})
        return
      }
      store.commit('setBpmValue', {akey: 'target', avalue: target})
      console.log('target', target)
      // 如果是单人签核默认选择第一个人
      if (paramObj.me.approvalType.approvalTypeSingle === target.nextTaskType) {
        let targetUsers = []
        targetUsers[0] = target.nextUsers[0].userId
        store.commit('setBpmValue', {akey: 'targetUsers', avalue: targetUsers})
      }
    }
    store.commit('setBpmValue', {akey: 'isFlowDialogVisible', avalue: true})
    paramObj.succFunc && paramObj.succFunc(data)
  }, (data) => {
    paramObj.failFunc && paramObj.failFunc(data)
  }, (data) => {
    paramObj.bizFailFunc && paramObj.bizFailFunc(data)
  })
}
actions.retrieveNextActivity = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'tsTaskId': paramObj.me.task.id,
    'taskId': paramObj.me.task.taskId,
    'bizData': paramObj.me.bizData,
    'async': false,
    'apiName': 'EBTA@RetrieveNextActivity_R2'
  }, data => {
    let target = JSON.parse(data.result.target)
    if (paramObj.me.completeTaskType.completeTaskTypeFail === target.completeTaskType) {
      // fail get activity user
      paramObj.me.alert(paramObj.me.bpmcoreI18n.RESP_ERROR_930003)
      paramObj.me.setBpmValue({akey: 'isSubmitVerify', avalue: false})
      paramObj.me.setBpmValue({akey: 'isConfirmVerify', avalue: false})
      return
    }
    store.commit('setBpmValue', {akey: 'target', avalue: target})
    console.log('target', target)
    // 如果是单人签核默认选择第一个人
    if (paramObj.me.approvalType.approvalTypeSingle === target.nextTaskType) {
      let targetUsers = []
      targetUsers[0] = target.nextUsers[0].userId
      store.commit('setBpmValue', {akey: 'targetUsers', avalue: targetUsers})
    }
    store.commit('setBpmValue', {akey: 'isFlowDialogVisible', avalue: true})
  }, (data) => {
  }, (data) => {
    paramObj.bizFailFunc && paramObj.bizFailFunc(data)
  })
}
actions.completeTask = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'userId': paramObj.me.task.userId,
    'tsTaskId': paramObj.me.task.id,
    'taskId': paramObj.me.task.taskId,
    'targetUsers': paramObj.me.targetUsers,
    'comments': paramObj.me.comments,
    'bizData': paramObj.me.bizData,
    'async': false,
    'apiName': 'EBTA@CompleteTask_R2'
  }, data => {
    console.log('**********************completeTask success**********************')
    paramObj.succFunc && paramObj.succFunc(data)
  }, (data) => {
    console.log('**********************completeTask error**********************')
    paramObj.failFunc && paramObj.failFunc(data)
  }, (data) => {
    paramObj.bizFailFunc && paramObj.bizFailFunc(data)
  })
}
actions.retrieveRejectPaths = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'tsTaskId': paramObj.me.task.id,
    'async': false,
    'apiName': 'EBTA@RetrieveRejectPaths_R2'
  }, data => {
    let rejectActivities = JSON.parse(data.result.rejectActivities)
    store.commit('setBpmValue', {akey: 'rejectActivities', avalue: rejectActivities})
    // 设置驳回的默认环节，选取第一个
    if (rejectActivities && rejectActivities.length > 0) {
      store.commit('setBpmValue', {akey: 'rejectTo', avalue: rejectActivities[0].activityId})
      console.log('rejectTo 默认选项', paramObj.me.rejectTo)
    }
    console.log('rejectActivities', paramObj.me.rejectActivities)
    store.commit('setBpmValue', {akey: 'isRejectFlowDialogVisible', avalue: true})
  }, (data) => {
  }, (data) => {
    paramObj.bizFailFunc && paramObj.bizFailFunc(data)
  })
}
actions.rejectTask = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'userId': paramObj.me.task.userId,
    'tsTaskId': paramObj.me.task.id,
    'rejectTo': paramObj.me.rejectTo,
    'comments': paramObj.me.comments,
    'bizData': paramObj.me.bizData,
    'async': false,
    'apiName': 'EBTA@RejectTask_R2'
  }, data => {
    paramObj.succFunc && paramObj.succFunc(data)
  }, (data) => {
    paramObj.failFunc && paramObj.failFunc(data)
  }, (data) => {
    paramObj.bizFailFunc && paramObj.bizFailFunc(data)
  })
}
actions.reassignTask = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'userId': paramObj.me.task.userId,
    'tsTaskId': paramObj.me.task.id,
    'reassignType': paramObj.me.reassignType,
    'reassignUserId': paramObj.me.reassignUserId,
    'comments': paramObj.me.comments,
    'async': false,
    'apiName': 'EBTA@ReassignTask_R2'
  }, data => {
    paramObj.succFunc && paramObj.succFunc(data)
  }, (data) => {
    paramObj.failFunc && paramObj.failFunc(data)
  }, (data) => {
    paramObj.bizFailFunc && paramObj.bizFailFunc(data)
  })
}
actions.cancelProcess = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'userId': paramObj.me.task.userId,
    'tsTaskId': paramObj.me.task.id,
    'async': false,
    'apiName': 'EBTA@CancelProcess_R2'
  }, data => {
    paramObj.me.alert('注销流程成功')
    paramObj.succFunc && paramObj.succFunc(data)
  }, (data) => {
    paramObj.failFunc && paramObj.failFunc(data)
  }, (data) => {
    paramObj.bizFailFunc && paramObj.bizFailFunc(data)
  })
}
actions.retrieveTaskDones = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'tsPiid': paramObj.me.inst.id,
    'async': false,
    'apiName': 'EBTA@RetrieveTaskDones_R2'
  }, data => {
    console.log('currStatus', JSON.parse(data.result.currStatus))
    console.log('taskDones', JSON.parse(data.result.taskDones))
    store.commit('setBpmValue', {akey: 'currStatus', avalue: JSON.parse(data.result.currStatus)})
    store.commit('setBpmValue', {akey: 'taskDones', avalue: JSON.parse(data.result.taskDones)})
  }, (data) => {
  }, (data) => {
  })
}
actions.inform = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'userId': paramObj.me.task.user,
    'tsPiid': paramObj.me.inst.id,
    'content': paramObj.me.informComments,
    'receivers': paramObj.me.informReceivers,
    'async': false,
    'apiName': 'EBTA@Inform_R2'
  }, () => {
    console.log('发送通知成功')
    paramObj.me.alert(paramObj.me.bpmcoreI18n.sendmsgSuccess)
  }, (data) => {
  }, (data) => {
  })
}
actions.checkIsDuplicated = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'ts_taskId': paramObj.me.task.id,
    'taskId': paramObj.me.task.taskId,
    'taskType': paramObj.me.task.taskType,
    'async': false,
    'apiName': 'EBCA_V3@AJAX_CheckDplTask'
  }, data => {
    console.log('checkIsDuplicated  -> data :', data)
    store.commit('setBpmValue', {akey: 'isDuplicated', avalue: data.isExist})
  }, (data, e) => {
  })
}
actions.checkAttachment = function (store, paramObj) {
  store.commit('setBpmValue', {akey: 'isExistAttachments', avalue: false})
  paramObj.me.httpBpmCore({
    'tsPiid': paramObj.me.inst.id,
    'piid': paramObj.me.inst.piid,
    'async': false,
    'apiName': 'EBCOMMA@AJAX_RetrieveAttachList'
  }, data => {
    console.log('checkIsDuplicated  -> data :', data)
    if (data && data.attachList && data.attachList.items && data.attachList.items.length > 0) {
      store.commit('setBpmValue', {akey: 'isExistAttachments', avalue: true})
      alert(paramObj.me.bpmcoreI18n.msgCanNotSave)
    }
  }, (data) => {
    console.log('checkIsDuplicated  -> data :', data)
  })
}
actions.genBtNo = function (store, paramObj) {
  paramObj.me.httpBpmCore({
    'versionFlag': 3,
    'seqType': '',
    'appShortName': store.state.inst.appShortName,
    'bpdName': store.state.inst.bpdName,
    'table': '',
    'async': false,
    'apiName': 'EBCA_V3@AJAX_retrieveSEQ_V3'
  }, data => {
    console.log(' *** result of AJAX_retrieveSEQ_V3: ' + JSON.stringify(data))
    store.commit('setBpmValue', {akey: 'inst.btNo', avalue: data.btNo})
  }, () => {
    console.log(' *** result of AJAX_retrieveSEQ_V3 genBtNo error')
    paramObj.me.tips('retrieve BT No failure!')
  })
}
export default actions
