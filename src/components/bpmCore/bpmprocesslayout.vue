<template>
  <div>
    <!--添加的无意义input id=_headermenuinput，用于解决nevaheader menu点击无法失去焦点的问题-->
    <div v-show="true"
         align="center"
         id="_headermenuinput"
         style="position:absolute;z-index: -10000;width:0px;right:100px;">
      <el-input ref="menuinput"
                size="mini"></el-input>
    </div>
    <el-container :style="{'height': windowHeight, 'background-color': '#909399'}">
      <el-container style="width: 70%">
        <el-header height="60px">
          <!--表头navheader-->
          <div id="_navheaderbar">
            <el-row>
              <el-col :span="8" class="titleClass">
                {{title}}
              </el-col>
              <el-col :span="16">
                <el-menu mode="horizontal"
                         text-color="#409EFF"
                         @select="navOptClicked">
                  <el-menu-item index="7">
                    {{bpmcoreI18n.close}}
                  </el-menu-item>
                  <el-menu-item index="6"
                                v-show="indexOfShowArray('cancel')">
                    {{bpmcoreI18n.cancel}}
                  </el-menu-item>
                  <el-submenu index="5"
                              popper-class="navSubMenu"
                              v-show="indexOfShowArray('advance')">
                    <template slot="title">{{bpmcoreI18n.advance}}</template>
                    <el-menu-item v-for="(val,i) in advanceShowArray"
                                  :index="'5-'+ (i+1)"
                                  :key="i">
                      {{bpmcoreI18n[val]}}
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item index="4"
                                v-show="indexOfShowArray('print')">
                    {{bpmcoreI18n.print}}
                  </el-menu-item>
                  <el-menu-item index="3"
                                v-show="indexOfShowArray('save')">
                    {{bpmcoreI18n.save}}
                  </el-menu-item>
                  <el-menu-item index="2"
                                v-show="indexOfShowArray('reject')">
                    {{bpmcoreI18n.reject}}
                  </el-menu-item>
                  <el-menu-item index="1"
                                v-show="indexOfShowArray('submit')">
                    {{bpmcoreI18n.submit}}
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
            <div v-show="totalShadeShow" id="_totalWindowShade" style="display:block; position:absolute; overflow:auto; z-index:11000; top:0; left:0; right:0; bottom:0;background-color:rgba(0,0,0,0.3)"></div>
            <!--下一环节弹框-->
            <template v-if="target">
              <submitstepdialog v-if = "completeTaskType.completeTaskTypeNext=== target.completeTaskType"
                                :dialogVisible="isFlowDialogVisible"
                                @completeStepOKBtnClicked="completeStepOKBtnClicked"/>
              <submittaskdialog v-else-if = "completeTaskType.completeTaskTypeSame=== target.completeTaskType"
                                :dialogVisible="isFlowDialogVisible"
                                @completeTaskOKBtnClicked="completeTaskOKBtnClicked"/>
              <submitprocessdialog v-else-if = "completeTaskType.completeTaskTypeComplete=== target.completeTaskType"
                                   :dialogVisible="isFlowDialogVisible"
                                   @completeProcessOKBtnClicked="completeProcessOKBtnClicked"/>
              <submitpooldialog v-else-if = "completeTaskType.completeTaskTypePool=== target.completeTaskType"
                                :dialogVisible="isFlowDialogVisible"
                                @completePoolOKBtnClicked="completePoolOKBtnClicked"/>
            </template>
            <!--驳回弹框-->
            <rejectdialog @rejectOKBtnClicked="rejectOKBtnClicked"
                          :dialogVisible="isRejectFlowDialogVisible"
            />
            <!--加签转办选人弹框 以及 通知弹框-->
            <el-dialog :title="bpmcoreI18n.nextUserLists"
                       align="center"
                       :show-close="false"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       top="5vh"
                       :visible.sync="isChoosePersonDialogVisible"
                       width="60%">
              <el-form align="left"
                       size="mini"
                       label-width="100px">
                <el-form-item :label="bpmcoreI18n.informComments"
                              v-show="isInformTextVisible">
                  <el-row>
                    <el-col :span="20">
                      <el-input  v-model="displayInformComments"
                                 type="textarea"
                                 :autosize="{minRows: 2,maxRows: 3}"
                                 maxlength="300"
                      ></el-input>
                    </el-col>
                    <el-col :span="4">
                      <span style="color: blue;">({{showInformInputLength}}/300)</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
              <!--v-model="choosePeople"-->
              <bpmpersonchoose @selectClicked="choosePersonSelectClicked"
                               @closeClicked="choosePersonCloseClicked"
                               v-model="choosePeople"
                               :multSelect="personChooseMultSelect"/>
            </el-dialog>
            <!--加签转办弹框-->
            <reassigndialog @reassignOKBtnClicked="reassignOKBtnClicked"
                            :dialogVisible="isReassignFlowDialogVisible"
                            :showReassignUser = "showReassignUser"/>
            <!--注销提示弹框-->
            <el-dialog :show-close="false"
                       align="center"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       :visible.sync="isCancelDialogVisible"
                       :title="bpmcoreI18n.textConfirmDelProc"
                       width="30%">
              <el-form ref="inst"
                       align="left"
                       size="mini"
                       label-width="100px">
              </el-form>
              <div slot="footer">
                <div align="center">
                  <el-button type="primary" plain
                             size="small"
                             @click="cancelProcessOKBtnClicked">
                    {{bpmcoreI18n.btnOk}}
                  </el-button>
                  <el-button type="primary" plain
                             size="small"
                             @click="cancelProcessCancelBtnClicked">
                    {{bpmcoreI18n.btnCancel}}
                  </el-button>
                </div>
              </div>
            </el-dialog>
          </div>
        </el-header>
        <el-main>
          <!--基本信息-->
          <!--<basearea/>-->
          <!--主表单-->
          <slot name="main"></slot>
        </el-main>
      </el-container>

      <div style="background-color: white;" >
          <el-aside  width="20px" v-show="asideTrigger">
            <div style="margin-left: 2px;margin-top: 20px; text-align: left;font-size: 18px;">
              <a href="javascript:void(0);" @click="asideArrowClick">
                <i class="el-icon-d-arrow-left"/>
              </a>
            </div>
          </el-aside>
      </div>

      <el-aside width="30%" v-show="!asideTrigger">
        <el-header style="width: 100%;">
          <div style="background-color: #FFFFFF;" >
            <el-row>
                <el-col :span="4">
                  <div style="margin-left: 2px;margin-top: 20px; text-align: left;font-size: 18px;">
                    <a href="javascript:void(0);" @click="asideArrowClick">
                      <i class="el-icon-d-arrow-right"/>
                    </a>
                  </div>
                </el-col>
              <!--目前不展示tab页签,因为添加了收缩按钮-->
              <!--<el-col :span="11">-->
                <!--<el-tabs type="card" v-model="activeTab">-->
                  <!--<el-tab-pane :label="bpmcoreI18n.details"-->
                               <!--name="historyTab">-->
                  <!--</el-tab-pane>-->
                <!--</el-tabs>-->
              <!--</el-col>-->
              <el-col :span="20">
                <!--流程图帮助非按钮的实现方式-->
                <div id="_asideMenu">
                  <el-menu mode="horizontal"
                           text-color="#409EFF"
                           @select="asideOptClick">
                    <el-menu-item index="1">
                      {{bpmcoreI18n.processDiagram}}
                    </el-menu-item>
                    <el-menu-item index="2" v-show="isHelpFileExist">
                      {{bpmcoreI18n.help}}
                    </el-menu-item>
                  </el-menu>
                </div>
              </el-col>
            </el-row>
            <!--流程图弹框-->
            <div id="_processDiagram">
              <el-dialog :showTitle="false"
                         align="center"
                         :title="bpmcoreI18n.processDiagram"
                         :visible.sync="isShowDiagram"
                         top="5vh"
                         width="70%">
                <diagram/>
              </el-dialog>
            </div>
            <!--帮助弹框-->
            <div id="_processHelp">
              <el-dialog :showTitle="false"
                         align="center"
                         :title="bpmcoreI18n.help"
                         :visible.sync="isShowHelp"
                         top="5vh"
                         width="70%">
                <help/>
              </el-dialog>
            </div>
          </div>
        </el-header>
        <el-main style="width:100%">
          <!--基本信息-->
          <baseareaaside/>
          <history/>
        </el-main>
      </el-aside>
    </el-container>
  </div>
</template>

<script>

import JQ from 'jquery'
import {mapState, mapActions} from 'vuex'
import submitstepdialog from './submitstepdialog.vue'
import submittaskdialog from './submittaskdialog.vue'
import submitprocessdialog from './submitprocessdialog.vue'
import submitpooldialog from './submitpooldialog.vue'
import rejectdialog from './rejectdialog.vue'
import reassigndialog from './reassigndialog.vue'
import bpmpersonchoose from './bpmpersonchoose.vue'
import history from './history.vue'
import diagram from './diagram.vue'
import help from './help.vue'
import basearea from './basearea.vue'
import baseareaaside from './baseareaaside.vue'

export default {
  name: 'bpmprocesslayout',
  components: {
    submitstepdialog,
    submittaskdialog,
    submitprocessdialog,
    submitpooldialog,
    rejectdialog,
    reassigndialog,
    bpmpersonchoose,
    history,
    diagram,
    help,
    basearea,
    baseareaaside
  },
  data () {
    return {
      showLeft: true,
      choosePeople: [],  // 选人组件初始值，格式[{uid: '111', cn: '2222'}]
      chooseAdvance: '', // 选择的高级-类型
      isChoosePersonDialogVisible: false,
      isInformTextVisible: false, // 通知的文本框
      informReceivers: [], // 通知人员
      chooseUid: '', // 选人框选择的人员
      personChooseMultSelect: false, // 选人框多选控制
      showReassignUser: '', // 传递给加签转办组件的displayName
      activeTab: 'historyTab',
      asideTrigger: false // aside收缩控制
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    hasPrint: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['langEnum', 'totalShadeShow', 'C_TASK_TYPE_INVOLVE', 'C_INST_STATUS_DRAFT', 'C_COMPLETE_TYPE_COMPLETEINVOLVE', 'C_OPERATION_REASSIGN', 'C_OPERATION_INVOLVE', 'advanceEnum', 'rejectTo', 'rejectActivities', 'isFlowDialogVisible', 'isRejectFlowDialogVisible', 'isReassignFlowDialogVisible', 'flowTypeEnum', 'flowType', 'isStartProc', 'targetUsers', 'approvalType']),
    ...mapState(['isHelpFileExist', 'isReassignVerify', 'isCancelVerify', 'isSubmitVerify', 'isConfirmVerify', 'isRejectVerify', 'isRejectConfirmVerify', 'isCancelDialogVisible', 'isDiagramDialogVisible', 'isExistAttachments', 'informComments', 'isDuplicated', 'bpmcoreI18n', 'hsInput', 'task', 'inst', 'activity', 'reassignType', 'reassignUserId', 'bizData', 'comments', 'completeTaskType', 'lang', 'userId', 'tsId', 'target']),

    windowHeight () {
      return JQ(document).height() + 'px'
    },
    isShowDiagram: {
      get () {
        return this.isDiagramDialogVisible
      },
      set (value) {
        this.setBpmValue({akey: 'isDiagramDialogVisible', avalue: value})
      }
    },
    isShowHelp: {
      get () {
        return this.$store.state.isHelpDialogVisible
      },
      set (value) {
        this.setBpmValue({akey: 'isHelpDialogVisible', avalue: value})
      }
    },
    displayInformComments: {
      get () {
        return this.informComments
      },
      set (value) {
        this.setBpmValue({akey: 'informComments', avalue: value})
      }
    },
    showInformInputLength: function () {
      return this.informComments.length + ''
    },
    // cancel advance save reject submit显隐控制
    btnShowArray: function () {
      console.log('btnShowArray activity', this.activity)
      console.log('btnShowArray flowType', this.flowType)
      let showArray = []
      if (this.hasPrint === true) {
        showArray.push('print')
      }
      if (this.flowType === this.flowTypeEnum.view) {
        return showArray
      }
      if (this.activity && this.activity.operations) {
        let currActivity = this.activity
        let operation = currActivity.operations
        operation.enSubmit && showArray.push('submit')
        operation.enSave && showArray.push('save')
        operation.enReject && showArray.push('reject')
        operation.enPrint && showArray.push('print')
        operation.enDelete && showArray.push('cancel')
        // 加签任务不显示advance
        if ((operation.enInform || operation.enReassign || operation.enInvolve) && this.task.taskType !== this.C_TASK_TYPE_INVOLVE) {
          showArray.push('advance')
        }
        operation.enDiagram && showArray.push('diagram')
        operation.enHistory && showArray.push('history')
        operation.enHelp && showArray.push('help')
      }
      console.log('nav btnShowArray', showArray)
      return showArray
    },
    // inform reassign involve显隐控制
    advanceShowArray: function () {
      console.log('advanceShowArray activity', this.activity)
      console.log('btnShowArray flowType', this.flowType)
      if (this.flowType === this.flowTypeEnum.view) {
        return []
      }
      if (this.activity && this.activity.operations) {
        let currActivity = this.activity
        let operation = currActivity.operations
        let showArray = []
        operation.enInform && showArray.push('inform')
        operation.enReassign && showArray.push('reassign')
        operation.enInvolve && showArray.push('involve')
        console.log('nav advanceShowArray', showArray)
        return showArray
      }
      return []
    }
  },
  watch: {
    isSubmitVerify (curVal, oldVal) {
      if (curVal === true && oldVal === false) {
        console.log('watch isSubmitVerify-> can do flow ')
        console.log('watch isSubmitVerify-> old val : ', oldVal)
        console.log('watch isSubmitVerify-> cur val : ', curVal)
        this.doRetrieveNextActivity()
      }
    },
    isConfirmVerify (curVal, oldVal) {
      if (curVal === true && oldVal === false) {
        console.log('watch isConfirmVerify-> can do flow ')
        console.log('watch isConfirmVerify-> old val : ', oldVal)
        console.log('watch isConfirmVerify-> cur val : ', curVal)
        // 加遮罩层
        this.setBpmValue({akey: 'totalShadeShow', avalue: true})
        let self = this
        setTimeout(() => {
          console.log('submit time out......')
          self.doSubmitTask()
          this.setBpmValue({akey: 'totalShadeShow', avalue: false})
        }, 100)
      }
    },
    isRejectVerify (curVal, oldVal) {
      if (curVal === true && oldVal === false) {
        console.log('watch isRejectVerify-> can do flow ')
        console.log('watch isRejectVerify-> old val : ', oldVal)
        console.log('watch isRejectVerify-> cur val : ', curVal)
        this.doRetrieveRejectPath()
      }
    },
    isRejectConfirmVerify (curVal, oldVal) {
      if (curVal === true && oldVal === false) {
        console.log('watch isRejectConfirmVerify-> can do flow ')
        console.log('watch isRejectConfirmVerify-> old val : ', oldVal)
        console.log('watch isRejectConfirmVerify-> cur val : ', curVal)
        // 加遮罩层
        this.setBpmValue({akey: 'totalShadeShow', avalue: true})
        // this.rejectFlowLoading = true
        let self = this
        setTimeout(() => {
          console.log('reject time out......')
          self.doRejectTask()
          this.setBpmValue({akey: 'totalShadeShow', avalue: false})
        }, 100)
      }
    },
    isReassignVerify (curVal, oldVal) {
      if (curVal === true && oldVal === false) {
        console.log('watch isReassignVerify-> can do flow ')
        console.log('watch isReassignVerify-> old val : ', oldVal)
        console.log('watch isReassignVerify-> cur val : ', curVal)
        // 弹加签转办提示框
        this.setBpmValue({akey: 'isReassignFlowDialogVisible', avalue: true})
      }
    },
    isCancelVerify (curVal, oldVal) {
      if (curVal === true && oldVal === false) {
        console.log('watch isCancelVerify-> can do flow ')
        console.log('watch isCancelVerify-> old val : ', oldVal)
        console.log('watch isCancelVerify-> cur val : ', curVal)
        this.setBpmValue({akey: 'isCancelDialogVisible', avalue: true})
      }
    }
  },
  methods: {
    ...mapActions(['setBpmValue', 'loadResource', 'genBtNo', 'checkAttachment', 'inform', 'checkIsDuplicated', 'retrieveTaskDones', 'cancelProcess', 'saveDraft', 'reassignTask', 'rejectTask', 'retrieveRejectPaths', 'completeTask', 'retrieveNextActivity', 'startProcess']),
    indexOfShowArray (aStr) {
      let index = JQ.inArray(aStr, this.btnShowArray)
      return index > -1
    },
    completeStepOKBtnClicked () {
      this.$emit('confirmVerify')
      this.setBpmValue({akey: 'totalShadeShow', avalue: false})
    },
    completeTaskOKBtnClicked () {
      this.$emit('confirmVerify')
      this.setBpmValue({akey: 'totalShadeShow', avalue: false})
    },
    completeProcessOKBtnClicked () {
      this.$emit('confirmVerify')
      this.setBpmValue({akey: 'totalShadeShow', avalue: false})
    },
    completePoolOKBtnClicked () {
      this.$emit('confirmVerify')
      this.setBpmValue({akey: 'totalShadeShow', avalue: false})
    },
    rejectOKBtnClicked () {
      this.$emit('rejectConfirmVerify')
      this.setBpmValue({akey: 'totalShadeShow', avalue: false})
    },
    reassignOKBtnClicked () {
      this.doReassignTask()
      this.setBpmValue({akey: 'totalShadeShow', avalue: false})
    },
    // 加签、转办、通知
    choosePage (advanceType) {
      // 点击加签转办通知时，初始化选人传入值
      this.choosePeople = []
      // 这里执行速度很快，没有ajax执行，不需要遮罩层
      this.setBpmValue({akey: 'comments', avalue: (this.lang === 'zh' ? '同意' : 'OK')})
      this.chooseAdvance = advanceType
      console.log(this.chooseAdvance)
      this.isChoosePersonDialogVisible = true
      // 文本框以及是否可选多人控制
      if (advanceType === this.advanceEnum.inform) {
        this.personChooseMultSelect = true
        this.isInformTextVisible = true
      } else {
        this.personChooseMultSelect = false
        this.isInformTextVisible = false
      }
    },
    // 选人组件调用的方法
    choosePersonSelectClicked (person) {
      console.log('reassign choosen person:', person)
      this.isChoosePersonDialogVisible = false
      if (!(person && person.length > 0)) {
        this.alert(this.bpmcoreI18n.choosePerson)
        this.isChoosePersonDialogVisible = true
        return
      }
      if (person && person.length > 0) {
        // 不允许加签转办给自己
        if (person[0].uid === this.task.userId && this.chooseAdvance !== this.advanceEnum.inform) {
          if (this.chooseAdvance === this.C_OPERATION_REASSIGN) {
            this.alert(this.bpmcoreI18n.msgCanNotTurndoSelf)
          } else if (this.chooseAdvance === this.C_OPERATION_INVOLVE) {
            this.alert(this.bpmcoreI18n.msgCanNotInvolveSelf)
          }
          return
        }
        this.chooseUid = person[0].uid
        this.showReassignUser = person[0].cn + '(' + person[0].uid + ')'
        // 如果选人不为空：
        // 1.加签转办需要校验逻辑，然后显示加签转办页面
        // 2.通知则不需要校验，直接弹框，点击确认后调用通知接口，并关闭弹框
        console.log('this.chooseAdvance--->', this.chooseAdvance)
        if (this.chooseAdvance === this.C_OPERATION_REASSIGN || this.chooseAdvance === this.C_OPERATION_INVOLVE) {
          this.setBpmValue({akey: 'reassignType', avalue: this.chooseAdvance})
          this.setBpmValue({akey: 'reassignUserId', avalue: this.chooseUid})
          this.$emit('reassignVerify')
          this.setBpmValue({akey: 'totalShadeShow', avalue: false})
        }
      }
      if (this.chooseAdvance === this.advanceEnum.inform) {
        if (this.informComments.trim() === '') {
          this.alert(this.bpmcoreI18n.fillInformComments)
          this.isChoosePersonDialogVisible = true
          return
        }
        console.log('informComments--------->', this.informComments)
        for (var i = 0; i < person.length; i++) {
          this.informReceivers[i] = person[i].uid
        }
        this.inform({me: this})
      }
    },
    choosePersonCloseClicked () {
      this.isChoosePersonDialogVisible = false
    },
    doRetrieveNextActivity () {
      if (this.inst.status === '40') {
        // 1. 防止用户发起后，从草稿再次发起
        this.$store.commit('setBpmValue', {akey: 'isDuplicated', avalue: false})
        this.checkIsDuplicated({me: this})
        if (this.isDuplicated) {
          this.alert(this.bpmcoreI18n.msgTaskHasBeenFinieshd)
          return
        }
        console.log('navbar inst genBtNo ->', this.inst)
        // 2. save draft.
        this.saveDraft({me: this})
      }
      // 判断是否是被加签任务，完成加签，完成加签接口不需要传输reassignUserId
      if (this.task.taskType === '2' ||
          (this.task.afUserId && this.task.afUserId != null && this.task.taskType === '5')) {
        this.setBpmValue({akey: 'reassignType', avalue: this.C_COMPLETE_TYPE_COMPLETEINVOLVE})
        this.setBpmValue({akey: 'reassignUserId', avalue: ''})
        this.showReassignUser = this.task.afUserName
        this.setBpmValue({akey: 'comments', avalue: (this.lang === 'zh' ? '同意' : 'OK')})
        this.setBpmValue({akey: 'isReassignFlowDialogVisible', avalue: true})
      } else {
        let self = this
        console.log('doRetrieveNextActivity flowType-> ', this.flowType)
        if (this.flowType === this.flowTypeEnum.draft) {
          console.log('saveDraft tsId-> ', this.tsId)
          console.log('saveDraft inst-> ', this.inst)
          console.log('saveDraft task-> ', this.task)
          // 获取发起弹框，调用发起接口前，先保存草稿，之后调用接口就可以一直传输tsid
          console.log('nav header btn click -> back into nav draft child -> 调用发起接口参数为false')
          this.setBpmValue({akey: 'isStartProc', avalue: false})
          this.startProcess({
            me: this,
            bizFailFunc: function () {
              self.setBpmValue({akey: 'isSubmitVerify', avalue: false})
              self.setBpmValue({akey: 'isConfirmVerify', avalue: false})
            }
          })
        } else if (this.flowType === this.flowTypeEnum.approve) {
          // 获取审批弹框
          console.log('nav header btn click -> back into nav approve child -> 调用获取下一环节接口')
          this.retrieveNextActivity({
            me: this,
            bizFailFunc: function () {
              console.log('doRetrieveNextActivity bizFailFunc')
              self.setBpmValue({akey: 'isSubmitVerify', avalue: false})
              self.setBpmValue({akey: 'isConfirmVerify', avalue: false})
            }
          })
        }
      }
    },
    doSubmitTask () {
      let self = this
      if (this.flowType === this.flowTypeEnum.draft) {
        // 正式发起流程
        console.log('nav header btn click -> back into nav draft child -> 调用发起接口参数为true')
        this.setBpmValue({akey: 'isStartProc', avalue: true})
        this.startProcess({
          me: this,
          succFunc: function (data) {
            if (self.isStartProc === true) {
              // 关闭窗口
              self.closeWindows()
            }
          },
          failFunc: function () {
            if (self.isStartProc === true) {
              console.log('doSubmitTask fail')
              self.setBpmValue({akey: 'isSubmitVerify', avalue: false})
              self.setBpmValue({akey: 'isConfirmVerify', avalue: false})
            }
          },
          bizFailFunc: function () {
            // 执行成功，但返回异常码，初始化校验位
            console.log('doSubmitTask biz fail')
            self.setBpmValue({akey: 'isSubmitVerify', avalue: false})
            self.setBpmValue({akey: 'isConfirmVerify', avalue: false})
          }
        })
      } else if (this.flowType === this.flowTypeEnum.approve) {
        // 提交审批任务
        console.log('nav header btn click -> back into nav approve child -> 调用完成任务接口')
        console.log('执行完成服务')
        this.completeTask({
          me: this,
          succFunc: function (data) {
            // 关闭窗口
            self.closeWindows()
          },
          failFunc: function () {
            // 服务执行失败中断，初始化校验位
            console.log('doSubmitTask fail')
            self.setBpmValue({akey: 'isSubmitVerify', avalue: false})
            self.setBpmValue({akey: 'isConfirmVerify', avalue: false})
          },
          bizFailFunc: function () {
            // 执行成功，但返回异常码，初始化校验位
            console.log('doSubmitTask biz fail')
            self.setBpmValue({akey: 'isSubmitVerify', avalue: false})
            self.setBpmValue({akey: 'isConfirmVerify', avalue: false})
          }
        })
      }
    },
    doRetrieveRejectPath () {
      let self = this
      console.log('nav header btn click -> back into nav approve child -> 调用获取驳回路径接口')
      this.retrieveRejectPaths({
        me: this,
        bizFailFunc: function () {
          self.setBpmValue({akey: 'isRejectVerify', avalue: false})
          self.setBpmValue({akey: 'isRejectConfirmVerify', avalue: false})
        }
      })
    },
    doRejectTask () {
      let self = this
      console.log('nav header btn click -> back into nav approve child -> 调用驳回任务接口')
      this.rejectTask({
        me: this,
        succFunc: function (data) {
          // 关闭窗口
          self.closeWindows()
        },
        failFunc: function () {
          // 服务执行失败中断
          console.log('doRejectTask fail')
        },
        bizFailFunc: function () {
          // 执行成功，但返回异常码，初始化校验位
          console.log('doRejectTask bizFail')
          self.setBpmValue({akey: 'isRejectVerify', avalue: false})
          self.setBpmValue({akey: 'isRejectConfirmVerify', avalue: false})
        }
      })
    },
    doReassignTask () {
      let self = this
      console.log('nav header btn click -> back into nav approve child -> 调用加签转办任务接口')
      console.log('reject time out......')
      self.reassignTask({
        me: this,
        succFunc: function (data) {
          if (self.reassignType === this.C_COMPLETE_TYPE_COMPLETEINVOLVE) {
            self.alert(self.bpmcoreI18n.msgInvolveSuccess)
          } else if (self.reassignType === this.C_OPERATION_REASSIGN) {
            self.alert(self.bpmcoreI18n.msgTurndoSuccess)
          } else if (self.reassignType === this.C_OPERATION_INVOLVE) {
            self.alert(self.bpmcoreI18n.msgInvolveSuccess)
          }
          // 关闭窗口
          self.closeWindows()
        },
        failFunc: function () {
          // 执行失败后，服务执行失败中断
          console.log('doReassignTask fail')
        },
        bizFailFunc: function () {
          // 执行成功，但返回异常码，初始化校验位
          console.log('doReassignTask bizFail')
          self.setBpmValue({akey: 'isReassignVerify', avalue: false})
        }
      })
    },
    navOptClicked (index) {
      this.$refs['menuinput'].focus()
      this.$refs['menuinput'].blur()
      switch (index + '') {
        case '1': this.submit(); break
        case '2': this.reject(); break
        case '3': this.save(); break
        case '4': this.print(); break
        case '5': break
        case '5-1': this.choosePage(this.advanceShowArray[0]); break
        case '5-2': this.choosePage(this.advanceShowArray[1]); break
        case '5-3': this.choosePage(this.advanceShowArray[2]); break
        case '5-4': this.choosePage(this.advanceShowArray[3]); break
        case '5-5': this.choosePage(this.advanceShowArray[4]); break
        case '5-6': this.choosePage(this.advanceShowArray[5]); break
        case '6': this.cancel(); break
        case '7': this.closeWindows(); break
      }
    },
    submit () {
      // 加遮罩层
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        // 生成表单号，在第三方接口中就会跳过，在发起接口中生成单号就迟了，很多SAP接口都用到了单号
        if (!this.inst.btNo) {
          this.genBtNo({me: this})
        }
        this.setBpmValue({akey: 'comments', avalue: (this.lang === 'zh' ? '同意' : 'OK')})
        this.$emit('submitVerify')
        this.setBpmValue({akey: 'totalShadeShow', avalue: false})
      }, 100)
    },
    reject () {
      // 加遮罩层
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        this.setBpmValue({akey: 'comments', avalue: ''})
        this.$emit('rejectVerify')
        this.setBpmValue({akey: 'totalShadeShow', avalue: false})
      }, 100)
    },
    save () {
      // 加遮罩层
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        // 1.判断任务是否处于当前环节及办理人，即是否有保存权限
        this.$store.commit('setBpmValue', {akey: 'isDuplicated', avalue: false})
        this.checkIsDuplicated({me: this})
        if (this.isDuplicated) {
          this.alert(this.bpmcoreI18n.msgTaskHasBeenFinieshd)
          this.setBpmValue({akey: 'totalShadeShow', avalue: false})
          return
        }
        // 2. 不能有附件
        let isNeedCheck = this.isNeedCheckAttachment()
        if (isNeedCheck) {
          this.checkAttachment({me: this})
        }
        console.log('this.isExistAttachments--->', this.isExistAttachments)
        if (this.isExistAttachments) {
          this.setBpmValue({akey: 'totalShadeShow', avalue: false})
          return
        }
        // 3.save draft
        this.saveDraft({me: this})
        // 调用业务保存
        this.$emit('save')
        console.log('save done')
        this.setBpmValue({akey: 'totalShadeShow', avalue: false})
      }, 100)
    },
    cancel () {
      // 加遮罩层
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        this.$emit('cancelVerify')
        this.setBpmValue({akey: 'totalShadeShow', avalue: false})
      }, 100)
    },
    print () {
      this.$emit('print')
    },
    closeWindows () {
      console.log('关闭窗口')
      try {
        if (window.opener !== undefined && typeof (window.opener.refreshOnTwStateShange) !== 'undefined') {
          console.log('start refreshOnTwStateShange')
          window.opener.refreshOnTwStateShange()
        }
      } catch (e) {
        console.log('closeWindows try catch exception')
      }
      window.opener = null
      window.open('', '_self', '')
      window.close()
      window.location.href = 'about:blank'
    },
    cancelProcessCancelBtnClicked () {
      this.setBpmValue({akey: 'isCancelDialogVisible', avalue: false})
      this.setBpmValue({akey: 'isCancelVerify', avalue: false})
    },
    cancelProcessOKBtnClicked () {
      // 加遮罩层
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        console.log('cancelprocess time out......')
        let self = this
        self.cancelProcess({
          me: this,
          succFunc: function (data) {
            // 关闭窗口
            self.closeWindows()
          },
          failFunc: function () {
            // 执行失败后去掉遮罩，服务执行失败中断
            console.log('去掉遮罩层')
          }
        })
        this.setBpmValue({akey: 'totalShadeShow', avalue: false})
      }, 100)
    },
    isNeedCheckAttachment () {
      var isNeedCheck = false
      if (this.activity.activityName && this.activity.activityName.toLowerCase().indexOf('@draft') !== -1) {
        isNeedCheck = true
      } else if (this.C_INST_STATUS_DRAFT === this.inst.status) {
        isNeedCheck = true
      }
      return isNeedCheck
    },
    showDiagram () {
      console.log('bpmlayout methods showDiagram begin')
      this.setBpmValue({akey: 'isDiagramDialogVisible', avalue: true})
      if (this.$store.state.countDiagram === 0) {
        let host = window.location.protocol + '//' + window.location.host
        console.log('host----->', host)
        if (host.indexOf('localhost:80') > -1) {
          host = 'http://bpmdev02.whchem.com' // 本地调试链接开发，需要登录或者单点
        }
        if (this.inst && this.inst.id) {
          let cacheURL = ''
          if (this.hsInput && this.hsInput.ts_piid && this.hsInput.ts_piid === '-1') {
            cacheURL = host + '/ECS_BPM_ADV/jsp/trdpty/processMapNew.jsp?bpdId=' + this.inst.bpdId + '&appShortName=' + this.inst.appShortName + '&snapshotId=' + this.inst.snapshotId
          } else {
            cacheURL = host + '/ECS_BPM_ADV/jsp/trdpty/processMapNew.jsp?bpdId=' + this.inst.bpdId + '&appShortName=' + this.inst.appShortName + '&tsPiid=' + this.inst.id + '&snapshotId=' + this.inst.snapshotId
          }
          this.setBpmValue({akey: 'showDiagramUrl', avalue: cacheURL})
        }
        console.log('showDiagramUrl----------->', this.$store.state.showDiagramUrl)
        this.setBpmValue({akey: 'countDiagram', avalue: 1})
      }
    },
    showHelp () {
      console.log('bpmlayout methods showHelp begin')
      this.setBpmValue({akey: 'isHelpDialogVisible', avalue: true})
    },
    asideOptClick (index) {
      this.$refs['menuinput'].focus()
      this.$refs['menuinput'].blur()
      switch (index + '') {
        case '1': this.showDiagram(); break
        case '2': this.showHelp(); break
      }
    },
    asideArrowClick () {
      console.log('aside arrow click')
      this.asideTrigger = !this.asideTrigger
    }
  }
}
</script>

<style scoped>
  .titleClass {
    color: #409EFF;
    background-color: #FFFFFF;
    height: 60px;
    padding-top: 20px;
    padding-left:20px;
    text-align: left;
  }
</style>
<style>
  #_navheaderbar  .el-submenu {
    float: right;
  }
  #_navheaderbar  .el-menu-item {
    float: right;
    height: 60px;
    line-height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
  }
  #_asideMenu  .el-submenu {
    float: right;
  }
  #_asideMenu  .el-menu-item {
    float: right;
    height: 60px;
    line-height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
  }
  /*流程图弹出框的样式*/
  /*#_processDiagram .el-dialog__body {*/
    /*padding: 0px 10px 20px 10px;*/
    /*color: #606266;*/
    /*font-size: 14px;*/
  /*}*/
  /*帮助文档弹出框的样式*/
  /*#_processHelp .el-dialog__body {*/
    /*padding: 0px 10px 20px 10px;*/
    /*color: #606266;*/
    /*font-size: 14px;*/
  /*}*/
  /*.高级弹出框的宽度样式*/
  .navSubMenu .el-menu--popup{
    min-width: 80px;
    text-align: center;
    /*top: -10px;*/
  }
</style>
