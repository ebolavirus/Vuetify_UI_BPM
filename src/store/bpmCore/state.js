'use strict'
let state = {
  userId: '',
  // 语言环境 zh en hu
  lang: '',
  langEnum: {
    en: 'en',
    zh: 'zh',
    hu: 'hu'
  },
  // 遮罩层控制变量
  totalShadeShow: false,
  bpmcoreI18n: {},
  // tsId
  tsId: '-1',
  hsInput: {},
  task: {},
  inst: {},
  activity: {},
  // (BPM引擎专用）页面状态：起草审批只读页面flag: draft approve view
  flowType: 'view',
  flowTypeEnum: {
    draft: 'draft',
    approve: 'approve',
    view: 'view'
  },
  // 工作流--提交--获取下一环节--用控制dialog显隐，false为dialog隐藏
  isFlowDialogVisible: false,
  // 工作流--驳回--弹框用控制dialog显隐，false为dialog隐藏
  isRejectFlowDialogVisible: false,
  // 工作流--加签转办选人框--用控制dialog显隐，false为dialog隐藏
  isReassignFlowDialogVisible: false,
  // 主表单历史流程图显隐控制
  mainVisible: true,
  diagramVisible: false,
  historyVisible: false,
  // isStartProc是否发起流程
  isStartProc: false,
  // 业务bizdata 网关信息格式为JSON格式字符换,例如{"totalsum":"1.00"}
  bizData: '',
  // 下一环节target，为JSON对象格式
  target: {},
  // 完成任务接口填入的选任列表
  targetUsers: [],
  // 发起/提交校验状态位，true为校验成功
  isSubmitVerify: false,
  // 确认校验状态位，true为校验成功
  isConfirmVerify: false,
  // 驳回校验状态位，true为校验通过
  isRejectVerify: false,
  // 驳回确认校验状态位，true为校验通过
  isRejectConfirmVerify: false,
  // 加签转办确认校验状态位，true为校验通过
  isReassignVerify: false,
  // 注销校验状态位，true为校验通过
  isCancelVerify: false,
  // 可驳回的路径/环节
  rejectActivities: [],
  // 驳回环节,驳回任务接口入参
  rejectTo: '',
  // 加签转办接口入参-加签转办完成加签类型
  reassignType: '',
  // 加签转办接口入参-目标人员
  reassignUserId: '',
  // 审批意见，提交驳回动作按钮中初始化
  comments: '',
  // 通知意见
  informComments: '',
  // 审批历史-当前处理环节办理人
  currStatus: [],
  // 审批历史-已办
  taskDones: [],
  // isDuplicated 判断任务是否已经被办理
  isDuplicated: false,
  // completeTaskType，获取下一环节接口返回的信息
  completeTaskType: {
    completeTaskTypeFail: 'fail',
    completeTaskTypeComplete: 'finish',
    completeTaskTypeSame: 'same',
    completeTaskTypePool: 'pool',
    completeTaskTypeNext: 'next'
  },
  // approval type签核类型
  approvalType: {
    approvalTypeSingle: 'single',
    approvalTypeMulti: 'multi',
    approvalTypeMultiSelect: 'multiSelect',
    approvalTypeCompete: 'compete'
  },
  // approvalTypeEnum approval type签核类型
  approvalTypeEnum: {
    hu: {
      multi: 'Többszörös jóváhagyás',
      single: 'Egyszerű jóváhagyás',
      multiSelect: 'Opcionális jóváhagyás',
      compete: 'competing approve'
    },
    en: {
      multi: 'all approve',
      single: 'single approve',
      multiSelect: 'optional approve',
      compete: 'competing approve'
    },
    zh: {
      multi: '多人签核',
      single: '单一签核',
      multiSelect: '可选多人签核',
      compete: '抢单签核'
    }
  },
  // task operation type
  C_OPERATION_SUBMIT: 'submit',
  C_OPERATION_REASSIGN: 'reassign',
  C_OPERATION_INVOLVE: 'involve',
  C_OPERATION_REJECT: 'reject',
  C_OPERATION_REPLACEOWNER: 'replaceowner',
  C_COMPLETE_TYPE_COMPLETEINVOLVE: 'completeInvolve',
  // task type  0:申请,1:待办,2:加签,3:转办,4：任务池,5:流程管理替换处理人
  C_TASK_TYPE_INVOLVE: '2', // involve
  // inst status
  C_INST_STATUS_DRAFT: '40',
  // bpmcore保存判断是否上传附件
  isExistAttachments: false,
  // 通知枚举
  advanceEnum: {
    inform: 'inform'
  },
  // attachListLength: 0,
  showDiagramUrl: '', // 流程图iframe url
  countDiagram: 0, // 控制流程图只加载一次
  countHistory: 0, // 控制审批历史只加载一次

  // ****************************
  // ***********选人组件*********
  // ****************************
  // ldap: {
  //   departmentArray: [], // 网上获取组织列表
  //   departmentData: [], // 通过组织列表计算出的组织树
  //   userArray: [] // 用户列表
  // },
  ldapdialogloading: 0,
  isDiagramDialogVisible: false, // 是否显示流程图弹框
  isHelpDialogVisible: false, // 是否显示帮助弹框
  showHelpUrl: '', // 帮助文档iframe url
  isCancelDialogVisible: false, // 注销提示弹框显隐控制
  isHelpFileExist: false // 流程帮助文档是否存在
}
export default state
