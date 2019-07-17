let bpmcoreI18n = {}
bpmcoreI18n.btnOk = '确定'
bpmcoreI18n.btnCancel = '取消'
bpmcoreI18n.btnSubmit = '提交'

bpmcoreI18n.msgInputvalueTooLong = '字数超出长度'
bpmcoreI18n.msgCommentsRequired = '请填写审批意见！'

bpmcoreI18n.msgNotLastSubmit = '您所在环节是多人处理，您晚了一步，您是最后提交任务的，所以需要重新提交任务。'
bpmcoreI18n.msgLoadActiConfigError = '流程配置错误，任务没有环节属性信息！'
bpmcoreI18n.msgGetActivityFailure = '获取环节信息失败！'
bpmcoreI18n.msgGetActivitySuccess = '获取环节信息成功！'
bpmcoreI18n.msgGetActivityError = '获取环节信息异常！'

bpmcoreI18n.textOtherUsers = '同环节处理人'
bpmcoreI18n.titleTaskSubmit = '任务提交'

bpmcoreI18n.titleCompleteProc = '结束流程'
bpmcoreI18n.textCompleteProc = '最后环节，确认提交并结束流程？'

bpmcoreI18n.msgRejectNotConfig = '没有配置可以驳回的环节!!!'

bpmcoreI18n.titleReject = '任务驳回'
bpmcoreI18n.textReject = '确认驳回到环节'

bpmcoreI18n.titleConfirmReinvolve = '加签任务'
bpmcoreI18n.textConfirmReinvolve = '确认将任务返回给'

bpmcoreI18n.msgSubmitSuccess = '提交成功'
bpmcoreI18n.msgSubmitFailure = '提交失败，请联系管理员！'

bpmcoreI18n.msgCanNotInvolveSelf = '不允许加签给自己！'

bpmcoreI18n.titleConfirmInvolve = '加签任务'
bpmcoreI18n.textConfirmInvolve = '确认将任务加签给'

bpmcoreI18n.msgInvolveSuccess = '加签成功！'
bpmcoreI18n.msgInvolveFailure = '加签失败，请联系管理员！'

bpmcoreI18n.msgCanNotTurndoSelf = '不允许转办给自己！'
bpmcoreI18n.titleConfirmTurndo = '转办任务'
bpmcoreI18n.textConfigmTurndo = '确认将任务转办给'
bpmcoreI18n.msgTurndoSuccess = '转办成功！'
bpmcoreI18n.msgTurndoFailure = '转办失败，请联系管理员！'

bpmcoreI18n.msgSaveCommentsSuccess = '保存意见成功！'
bpmcoreI18n.msgSaveCommentsFailure = '保存意见失败！'

bpmcoreI18n.msgApprovalType0 = '单一签核'
bpmcoreI18n.msgApprovalType1 = '多人签核'
bpmcoreI18n.msgApprovalType2 = '可选多人签核'
bpmcoreI18n.msgApprovalType3 = '抢单签核'
bpmcoreI18n.msgApprovalType4 = '声明式抢单签核'

bpmcoreI18n.msgGetNextActivityFailure = '没有找到后续环节配置信息，请联系管理员！'
bpmcoreI18n.msgGetNextUsersFailure = '没有后续处理人无法提交任务，请联系管理员！'

bpmcoreI18n.titleTaskSubmit = '任务提交'
bpmcoreI18n.textTaskSubmit = '任务提交到'
bpmcoreI18n.textTaskPool = '任务池'

bpmcoreI18n.textFinishTask = '请选择审批人！'
bpmcoreI18n.msgFinishNoActors = '没有后续环节处理人，不能提交！'

bpmcoreI18n.msgCanNotFinishTask = '由于管理员暂停了流程，所有当前任务不能提交！请稍后提交！'

bpmcoreI18n.titleConfirmDelProc = '注销流程'
bpmcoreI18n.textConfirmDelProc = '确认注销流程？'
bpmcoreI18n.msgDelProcSuccess = '注销流程成功！'
bpmcoreI18n.msgDelProcFailure = '注销流程失败！'

bpmcoreI18n.comments = '审批意见' // 名称同意见重复因此换名
bpmcoreI18n.finishTaskTitle = '新的任务将被分配给以下用户'
bpmcoreI18n.commentsDefault = '同意'
bpmcoreI18n.finishTaskNextAct = '下一任务'
bpmcoreI18n.finishTaskType = '任务类型'
bpmcoreI18n.finishNextUsers = '名称'
bpmcoreI18n.finishNextDepts = '部门'

bpmcoreI18n.msgGetTargetActivity = '流程错误，没有后续环节！'

bpmcoreI18n.apprDuty = '审批职责'

bpmcoreI18n.msgGetTargetActActError = '环节配置错误，请联系管理员。'
bpmcoreI18n.msgGetTargetActUserError = '环节用户配置错误，请联系管理员。'
bpmcoreI18n.msgGetTargetActError = '获取后续环节失败，请重试。'
bpmcoreI18n.msgGetTargetActNull = '后续环节为空'
bpmcoreI18n.msgGetTargetActUserNull = '后续环节的人员为空。'

bpmcoreI18n.msgCompleteTaskFailed = '完成任务失败。'
bpmcoreI18n.msgCantFindTargetActTaskHistory = '没有找到目标环节的已办任务。'

bpmcoreI18n.msgCreateTaskCtrlFailed = '创建任务控制信息失败！'
bpmcoreI18n.msgTaskReassignFailed = '任务重新分配失败！'

bpmcoreI18n.isPool = '是否是任务池'
bpmcoreI18n.isPoolYes = '是'
bpmcoreI18n.isPoolNo = '否'

bpmcoreI18n.targetActivities = '后续目标环节列表'
bpmcoreI18n.nextUserLists = '人员列表'

bpmcoreI18n.taskName = '任务名称'
bpmcoreI18n.taskUser = '用户'
bpmcoreI18n.taskType = '任务类型'

bpmcoreI18n.msgCanNotSave = '起草环节保存时不能有附件，请删除后进行保存！'
bpmcoreI18n.msgConfirmCancelSubmitTitle = '确认取消提交'
bpmcoreI18n.msgConfirmCancelSubmit = '取消提交后，将删除所有附件，请确认是否取消提交?'

bpmcoreI18n.msgSaveSuccess = '保存成功'
bpmcoreI18n.msgSaveFailure = '保存失败'

bpmcoreI18n.msgDuplicatedSubmitTask = '任务已经被处理，请不要重复提交！'
bpmcoreI18n.msgTaskHasBeenFinieshd = '任务已经被处理，请关闭当前页面！'
bpmcoreI18n.msgInstHasBeenDeleted = '单据已经被注销，请关闭当前页面！'
bpmcoreI18n.msgCheckTaskExit = '当前状态无法完成注销操作！'

bpmcoreI18n.changeOrgPathNotSubmit = '您的组织路径发生了变动，请注销该单据，重新发起流程！'
bpmcoreI18n.getOrgPathByUidError = '获取用户组织路径出错！'

/**
 * 原coach view组件中
 */
bpmcoreI18n.advance = '高级'
bpmcoreI18n.baseInfo = '基本信息'
bpmcoreI18n.applyNumber = '申请单号'
bpmcoreI18n.applyDate = '申请日期'
bpmcoreI18n.applicant = '申请人'
bpmcoreI18n.applyCompany = '申请公司/部门'
bpmcoreI18n.applyPhone = '申请人电话'
bpmcoreI18n.processDiagram = '流程图' // PROCESS.DIAGRAM=流程图
bpmcoreI18n.currentStatus = '当前状态' // CURRENT.STATUS=当前状态
bpmcoreI18n.taskName = '任务名称' // TASK.NAME=任务名称
bpmcoreI18n.user = '用户' // USER=用户
bpmcoreI18n.taskType = '任务类型' // TASK.TYPE=任务类型
bpmcoreI18n.historyListIndex = '序号'
bpmcoreI18n.historyListUserName = '用户名'
bpmcoreI18n.historyListOperate = '操作'
bpmcoreI18n.historyListReceTime = '接收时间'
bpmcoreI18n.historyListCompTime = '完成时间'
bpmcoreI18n.historyListUserTime = '用时(天)'
bpmcoreI18n.history = '历史' // HISTORY=历史
bpmcoreI18n.main = '主表单' // MAIN.APPLICATION=主表单
bpmcoreI18n.involve = '加签' // INVOLVE=加签
bpmcoreI18n.reassign = '转办' // REASSIGN=转办
bpmcoreI18n.inform = '通知' // INFORM=通知
bpmcoreI18n.close = '关闭'// CLOSE=关闭
bpmcoreI18n.cancel = '注销' // CANCEL=注销
bpmcoreI18n.advance = '高级' // ADVANCE=高级
bpmcoreI18n.save = '保存' // SAVE=保存
bpmcoreI18n.reject = '驳回' // REJECT=驳回
bpmcoreI18n.submit = '提交' // SUBMIT=提交
bpmcoreI18n.print = '打印'
bpmcoreI18n.help = '帮助'
bpmcoreI18n.details = '详情'

bpmcoreI18n.sendmsgSuccess = '发送通知成功'
bpmcoreI18n.fillInformComments = '请填写意见'
bpmcoreI18n.choosePerson = '请选择人员'
bpmcoreI18n.informComments = '意见'

// 影像链接
bpmcoreI18n.outsideNoVisit = '外网不允许访问'

// EBTA
bpmcoreI18n.msgExecServiceError = '服务执行失败，请联系管理员!!'
bpmcoreI18n.RESP_ERROR_900000 = 'BPM系统内部错误'
bpmcoreI18n.RESP_ERROR_900001 = '请求参数存在为空的情况'
bpmcoreI18n.RESP_ERROR_900002 = '无权限操作'
bpmcoreI18n.RESP_ERROR_900003 = '任务已经被处理,请关闭该页面！' // 无法获取任务
bpmcoreI18n.RESP_ERROR_900004 = '无法获取流程实例'
bpmcoreI18n.RESP_ERROR_900005 = '无法获取环节'
bpmcoreI18n.RESP_ERROR_900006 = '输出参数转换错误'
bpmcoreI18n.RESP_ERROR_910001 = '审批意见不能为空'
bpmcoreI18n.RESP_ERROR_910002 = '流程模板已经暂停，不允许进行提交、驳回操作'
bpmcoreI18n.RESP_ERROR_910003 = '驳回特殊处理时出现错误'
bpmcoreI18n.RESP_ERROR_910004 = '多环节并发提交异常，需要重新进行提交'
bpmcoreI18n.RESP_ERROR_910005 = '保存流程控制信息失败'
bpmcoreI18n.RESP_ERROR_910006 = '当前任务已经被其他人处理'
bpmcoreI18n.RESP_ERROR_910007 = '当前任务为最后一个任务'
bpmcoreI18n.RESP_ERROR_910008 = '提交特殊服务执行出错'
bpmcoreI18n.RESP_ERROR_910009 = '驳回环节无任务，无法驳回'
bpmcoreI18n.RESP_ERROR_910010 = '批量审批任务正在处理中，请不要重复提交'
bpmcoreI18n.RESP_ERROR_910011 = '提交特殊服务校验失败' // 内容为备注，实际为透传错误信息
bpmcoreI18n.RESP_ERROR_910012 = '驳回特殊服务校验失败' // 内容为备注，实际为透传错误信息
bpmcoreI18n.RESP_ERROR_910013 = '获取下一环节特殊服务校验失败' // 内容为备注，实际为透传错误信息
bpmcoreI18n.RESP_ERROR_910014 = '发起后置特殊服务执行失败'
bpmcoreI18n.RESP_ERROR_910015 = '发起后置特殊服务校验失败' // 内容为备注，实际为透传错误信息
bpmcoreI18n.RESP_ERROR_920001 = '不能加签转办给自己'
bpmcoreI18n.RESP_ERROR_920002 = '无法获取指定处理人用户信息'
bpmcoreI18n.RESP_ERROR_920003 = '转办/加签提交失败'
bpmcoreI18n.RESP_ERROR_920004 = '转办、加签提交特殊服务校验失败' // 内容为备注，实际为透传错误信息
bpmcoreI18n.RESP_ERROR_920005 = '转办、加签提交特殊服务失败'
bpmcoreI18n.RESP_ERROR_930001 = '所有请求参数不能同时为空'
bpmcoreI18n.RESP_ERROR_930002 = '不能获取下一环节'
bpmcoreI18n.RESP_ERROR_930003 = '不能获取下一环节审批人'
bpmcoreI18n.RESP_ERROR_930004 = '获取下一环节配置错误' // 透传信息,通过财务共享配置表抛错误信息
bpmcoreI18n.RESP_ERROR_930005 = '流程已被注销，无法提交'
bpmcoreI18n.RESP_ERROR_930006 = '获取下一环节特殊服务执行出错'
bpmcoreI18n.RESP_ERROR_940001 = '无法获取任务ID'
bpmcoreI18n.RESP_ERROR_950001 = '下一环节处理人账户冻结'
bpmcoreI18n.RESP_ERROR_9003 = '无法获取用户信息'
bpmcoreI18n.RESP_ERROR_9004 = '无法获取用户部门信息'
bpmcoreI18n.RESP_ERROR_9005 = '无法获取起草环节信息'
bpmcoreI18n.RESP_ERROR_9006 = '流程发起初始化错误'
bpmcoreI18n.RESP_ERROR_9007 = '流程发起错误'
bpmcoreI18n.RESP_ERROR_9008 = '保存草稿错误'
bpmcoreI18n.RESP_ERROR_9009 = '执行流程发起特殊操作错误'
bpmcoreI18n.RESP_ERROR_9010 = '获取下一环节信息错误'
bpmcoreI18n.RESP_ERROR_9011 = '发起流程接口startSP服务业务数据校验不通过' // 内容为备注，实际为透传错误信息

// ldap choose
bpmcoreI18n.post = '制证'
bpmcoreI18n.add = '新增'
bpmcoreI18n.update = '修改'
bpmcoreI18n.delete = '删除'
bpmcoreI18n.hide = '隐藏'
bpmcoreI18n.modify = '更新'
bpmcoreI18n.save = '保存'
bpmcoreI18n.gridTitleNormal = '表单详情'
bpmcoreI18n.gridTitleAdd = '新增记录'
bpmcoreI18n.gridTitleModify = '修改记录'
bpmcoreI18n.gridTitleReadonly = '记录详情'
bpmcoreI18n.query = '查询'
bpmcoreI18n.dbclkNote = '注:请双击一行记录来编辑记录!'
bpmcoreI18n.updateWarn = '注:已添加的报销明细无法修改内部订单或核算科目，如要修改请删除后新增。'
bpmcoreI18n.mustChooseOne = '请选择一行记录进行保存操作!'
bpmcoreI18n.comcode = '公司代码'
bpmcoreI18n.comname = '公司名称'
bpmcoreI18n.bankcode = '银行代码'
bpmcoreI18n.cardno = '银行卡号'
bpmcoreI18n.bankname = '银行名称'
bpmcoreI18n.aprName = '审批人'
bpmcoreI18n.aprRound = '审批环节'
bpmcoreI18n.aprTime = '审批时间'
bpmcoreI18n.aprOpinion = '审批意见'
bpmcoreI18n.back = '返回'
bpmcoreI18n.searchTitle = '搜索条件'
bpmcoreI18n.name = '姓名'
bpmcoreI18n.department = '部门'
bpmcoreI18n.employeeNo = '工号'
bpmcoreI18n.firstPage = '首页'
bpmcoreI18n.prevPage = '上一页'
bpmcoreI18n.nextPage = '下一页'
bpmcoreI18n.lastPage = '尾页'
bpmcoreI18n.chosens = '已选中人员列表'
bpmcoreI18n.remove = '移除'
bpmcoreI18n.removeAll = '移除全部'
bpmcoreI18n.sureBig = ' 确 定 '
bpmcoreI18n.cancelBig = ' 取 消 '
bpmcoreI18n.cannotNull = '不能为空!'
bpmcoreI18n.pleaseInput = '请填写'
bpmcoreI18n.keeponAdd = '保存成功，是否继续添加？'
bpmcoreI18n.warningText = '* 请将涉及接待费、会务费、交通费、差旅费、团队活动费、培训费等所需明细、链接或申请表附在附件中。'
bpmcoreI18n.Loading = '拼命加载中……'

bpmcoreI18n.alert = '提示->'
export default bpmcoreI18n
