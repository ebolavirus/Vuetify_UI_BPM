<template>
  <el-card>
    <div slot="header" style="font-size: 10px;text-align: left;">{{bpmcoreI18n.history}}</div>
    <div id="_historyStep" v-if="nowExplorer !== 'ie' && nowExplorer !== 'edge'" >
      <el-steps direction="vertical" :active="1">
        <el-step :title="bpmcoreI18n.currentStatus + '-' + currStatusInfo.activityName"
                 v-show="currStatusShow">
          <template slot="description">
            {{currStatusInfo.currUsers}}<br>{{currStatusInfo.approvalType}}
          </template>
        </el-step>
          <el-step  v-for="(val,i) in showTaskDones"
                    :key="i"
                    status="success"
                    :title="val.activityName + '-' + val.operation">
            <div slot="description" style="word-wrap: break-word;word-break:break-all;">
              {{val.userName}}<br>{{val.completeTime}}<br>{{val.comments}}
            </div>
          </el-step>
      </el-steps>
    </div>
    <div v-else>
      <table cellpadding="0" cellspacing="1" border="0" class="historyTable"
             v-show="currStatusShow">
        <thead>
        <tr>
          <th width="35%" style="padding-left: 10px;">{{bpmcoreI18n.taskName}}</th>
          <th width="35%" style="padding-left: 10px;">{{bpmcoreI18n.user}}</th>
          <th width="30%" style="padding-left: 10px;">{{bpmcoreI18n.taskType}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td align="left" style="padding-left: 10px">{{currStatusInfo.activityName}}</td>
          <td align="left" style="padding-left: 10px">{{currStatusInfo.currUsers}}</td>
          <td align="left" style="padding-left: 10px">{{currStatusInfo.approvalType}}</td>
        </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="1" border="0" class="historyTable">
        <thead>
        <tr>
          <th width="35%" style="padding-left: 10px;">{{bpmcoreI18n.historyListIndex}}</th>
          <th width="35%" style="padding-left: 10px;">{{bpmcoreI18n.historyListOperate}}</th>
          <th width="30%" style="padding-left: 10px;">{{bpmcoreI18n.historyListCompTime}}</th>
        </tr>
        </thead>
        <tbody>
            <template v-for="(val,i) in showTaskDones">
              <tr :key="i">
                <td rowspan="3">{{i+1}}.{{val.activityName}}</td>
                <td align="left" style="padding-left: 10px">{{val.operation}}</td>
                <td align="left" style="padding-left: 10px">{{val.completeTime}}</td>
              </tr>
              <tr :key="'list' + i">
                <td align="left" colspan="2" style="padding-left: 10px">{{val.userName}}</td>
              </tr>
              <tr :key="'listt' + i">
                <td align="left" colspan="2" style="padding-left: 10px;word-wrap: break-word;word-break: break-all;">{{val.comments}}</td>
              </tr>
            </template>
        </tbody>
      </table>
    </div>
  </el-card>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'history',
  data () {
    return {
      isDialogVisible: false,
      nowExplorer: this.currentExplorer(),
      activeHeader: ['1'],
      activeList: ['1']
    }
  },
  computed: {
    ...mapState(['currStatus', 'bpmcoreI18n', 'lang', 'taskDones', 'langEnum', 'currStatus', 'inst']),
    ...mapState(['C_OPERATION_SUBMIT', 'C_OPERATION_REASSIGN', 'C_OPERATION_INVOLVE', 'C_OPERATION_REJECT', 'C_OPERATION_REPLACEOWNER', 'C_COMPLETE_TYPE_COMPLETEINVOLVE']),
    currStatusInfo: function () {
      let currStatusInfo = {}
      currStatusInfo.activityName = ''
      currStatusInfo.approvalType = ''
      currStatusInfo.currUsers = ''
      if (this.currStatus && this.currStatus.length > 0) {
        if (this.lang === 'zh') {
          currStatusInfo.activityName = this.currStatus[0].activityName.substr(0, this.currStatus[0].activityName.indexOf('@'))
        } else {
          currStatusInfo.activityName = this.currStatus[0].activityName.substr(this.currStatus[0].activityName.indexOf('@') + 1)
        }
        if (this.currStatus[0].approvalType === '0') {
          currStatusInfo.approvalType = this.bpmcoreI18n.msgApprovalType0
        } else if (this.currStatus[0].approvalType === '1') {
          currStatusInfo.approvalType = this.bpmcoreI18n.msgApprovalType1
        } else if (this.currStatus[0].approvalType === '2') {
          currStatusInfo.approvalType = this.bpmcoreI18n.msgApprovalType2
        } else if (this.currStatus[0].approvalType === '3') {
          currStatusInfo.approvalType = this.bpmcoreI18n.msgApprovalType3
        } else if (this.currStatus[0].approvalType === '4') {
          currStatusInfo.approvalType = this.bpmcoreI18n.msgApprovalType4
        }
        currStatusInfo.currUsers = this.currStatus[0].currUsers
      }
      console.log('currStatusInfo', currStatusInfo)
      return currStatusInfo
    },
    currStatusShow: function () {
      if (this.currStatus && this.currStatus.length > 0) {
        return true
      }
      return false
    },
    showTaskDones: function () {
      let showTaskDonesInfo = []
      showTaskDonesInfo[0] = {}
      showTaskDonesInfo[0].activityName = ''
      showTaskDonesInfo[0].comments = ''
      showTaskDonesInfo[0].completeTime = ''
      showTaskDonesInfo[0].createTime = ''
      showTaskDonesInfo[0].userName = ''
      showTaskDonesInfo[0].operation = ''
      showTaskDonesInfo[0].usingDay = ''
      for (let i = 0; i < this.taskDones.length; i++) {
        let taskDone = this.taskDones[i]
        console.log('taskDone->', taskDone)
        showTaskDonesInfo[i] = {}
        if (this.lang === 'zh') {
          showTaskDonesInfo[i].activityName = taskDone.activityName.substr(0, taskDone.activityName.indexOf('@'))
        } else {
          showTaskDonesInfo[i].activityName = taskDone.activityName.substr(taskDone.activityName.indexOf('@') + 1)
        }
        console.log('activityName->', showTaskDonesInfo[i].activityName)
        let operate = ''
        if (taskDone.operation === null || taskDone.operation === '' || typeof taskDone.operation === 'undefined') {
          operate = 'submit'
        } else {
          operate = taskDone.operation.toLowerCase()
        }
        let operateName = ''
        if (operate === this.C_OPERATION_SUBMIT.toLowerCase()) {
          operateName = (this.lang === this.langEnum.zh ? '提交' : 'Submit')
        } else if (operate === this.C_OPERATION_REASSIGN.toLowerCase()) {
          operateName = (this.lang === this.langEnum.zh ? '转办' : 'Reassign')
        } else if (operate === this.C_OPERATION_INVOLVE.toLowerCase()) {
          operateName = (this.lang === this.langEnum.zh ? '加签' : 'Involve')
        } else if (operate === this.C_OPERATION_REJECT.toLowerCase()) {
          operateName = (this.lang === this.langEnum.zh ? '驳回' : 'Reject')
        } else if (operate === this.C_OPERATION_REPLACEOWNER.toLowerCase()) {
          operateName = (this.lang === this.langEnum.zh ? '替换处理人' : 'ReplaceOwner')
        } else if (operate === this.C_COMPLETE_TYPE_COMPLETEINVOLVE.toLowerCase()) {
          operateName = (this.lang === this.langEnum.zh ? '完成加签' : 'completeInvolve')
        }
        showTaskDonesInfo[i].operation = operateName

        let taskComments = taskDone.comments
        if (taskComments === '同意@OK') {
          if (this.lang === this.langEnum.zh) {
            taskComments = '同意'
          } else {
            taskComments = 'OK'
          }
        }
        showTaskDonesInfo[i].comments = taskComments
        showTaskDonesInfo[i].userName = taskDone.userName
        if (taskDone.hasOwnProperty('fetchedTime') && taskDone.fetchedTime !== null
          && typeof taskDone.fetchedTime !== 'undefined' && taskDone.fetchedTime !== '') {
          taskDone.createTime = taskDone.fetchedTime
        }
        showTaskDonesInfo[i].completeTime = this.toLocaleDate(taskDone.completeTime)
        showTaskDonesInfo[i].createTime = this.toLocaleDate(taskDone.createTime)
        showTaskDonesInfo[i].usingDay = this.countDate(showTaskDonesInfo[i].completeTime, showTaskDonesInfo[i].createTime) // taskDone.completeTime - taskDone.createTime
      }
      console.log('history showTaskDonesInfo-->', showTaskDonesInfo)
      return showTaskDonesInfo.reverse()
    }
  },
  methods: {
    ...mapActions(['retrieveTaskDones'])
  },
  mounted () {
    // 调用历史接口,改为在loadresourc后异步调用
    // if (!this.inst.id) { return }
    // this.retrieveTaskDones({me: this})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .historyTable {
    font-size: 12px;
    width: 100%;
    background-color: #E3E3E3;
    padding: 0px;
    margin: 0px;
  }
  .historyTable thead tr {
    background-color: #F4F4F4;
    height: 24px;
    text-align: left;
  }
  .historyTable tbody tr {
    background-color: #ffffff;
    height: 24px;
    text-align: center;
  }
  th, td {
    padding: 0px;
    border-bottom: none;
  }
  tbody {
    padding: 0;
    margin: 0;
  }
  .historyTable thead tr th {
    font-weight: 100;
  }

</style>
<style>
</style>
