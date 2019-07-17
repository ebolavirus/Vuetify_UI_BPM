<template>
  <!--<div class="_bpmcoreDialog">-->
    <el-dialog :show-close="false"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             align="center"
             :visible.sync="dialogVisible"
             :title="bpmcoreI18n.finishTaskTitle"
             width="40%">
      <el-form ref="inst"
               align="left"
               size="mini"
               label-width="100px">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item :label="bpmcoreI18n.comments" >
              <el-input  v-model="displayComments"
                         type="textarea"
                         :autosize="{minRows: 3,maxRows: 6}"
                         @focus="commentsClick"
                         @blur="commentsBlur"
                         maxlength="300"
                         @keyup.enter.native=""
              ></el-input>
              <span style="color: blue;">({{showInputLength}}/300)</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item :label="bpmcoreI18n.finishTaskNextAct" >
              {{showActivityName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="bpmcoreI18n.finishTaskType" >
              {{approvalTypeEnum[lang][target.nextTaskType]}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--人员众多时添加滚轮-->
      <div style="max-height:180px;overflow: auto;">
      <table style="background-color: rgb(227, 227, 227);" width="100%" cellpadding="0"
             cellspacing="1">
        <thead>
        <tr style="background-color: #FFFFFF">
          <th width="4%" height="30px" style=""></th>
          <th width="24%" style="text-align: left;padding-left: 10px">{{bpmcoreI18n.finishNextUsers}}</th>
          <th width="72%" style="text-align: left;padding-left: 10px">{{bpmcoreI18n.finishNextDepts}}</th>
        </tr>
        </thead>
        <tbody >
        <tr style="padding-left: 10px;background-color: #FFFFFF; height: 30px;"
            v-for="(val,i) in target.nextUsers" :key="i">
          <td v-if= "approvalType.approvalTypeCompete === target.nextTaskType
                          || approvalType.approvalTypeMulti === target.nextTaskType"
              style="text-align:center;">{{i+1}}</td>
          <td v-if= "approvalType.approvalTypeMultiSelect=== target.nextTaskType"
              style="text-align:center;">
            <input type="checkbox"  name="boxSelectedUser"  v-model="val.checkboxFlag"/></td>
          <td v-if= "approvalType.approvalTypeSingle === target.nextTaskType"
              style="text-align:center;">
            <input type="radio" name="radioSelectedUser"
                   v-model="targetUsers[0]"
                   :value="val.userId"></td>
          <!--:checked="i===0"-->
          <td style="font-size: 14px;padding-left: 10px">{{val.displayName}}</td>
          <td style="font-size: 14px;padding-left: 10px">{{val.deptName}}</td>
        </tr>
        </tbody>
      </table>
      </div>
    <div slot="footer">
      <div align="center">
        <el-button v-show="okBtnShow"
                   type="primary"plain
                   size="small"
                   @click="completeStepOKBtnClicked">
          {{bpmcoreI18n.btnOk}}
        </el-button>
        <el-button type="primary"plain
                   size="small"
                   @click="completeStepCancelBtnClicked">
          {{bpmcoreI18n.btnCancel}}
        </el-button>
      </div>
    </div>
  </el-dialog>
  <!--</div>-->
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'submitstepdialog',
  data () {
    return {
      okBtnShow: true
    }
  },
  computed: {
    ...mapState(['bpmcoreI18n', 'bpdUri', 'tsId', 'pageTypeEnum', 'targetUsers',
      'target', 'bizData', 'comments', 'lang', 'approvalType', 'approvalTypeEnum',
      'isSubmitVerify', 'isStartProc', 'completeTaskType', 'userId', 'isFlowDialogVisible']),
    showInputLength: function () {
      return this.comments.length + ''
    },
    // 审批意见
    displayComments: {
      get () {
        return this.comments
      },
      set (value) {
        this.setBpmValue({akey: 'comments', avalue: value})
      }
    },
    // 展示下一环节名称
    showActivityName: function () {
      if (this.lang === 'zh') {
        return this.target.nextActivities[0].activityName.substr(0, this.target.nextActivities[0].activityName.indexOf('@'))
      } else {
        return this.target.nextActivities[0].activityName.substr(this.target.nextActivities[0].activityName.indexOf('@') + 1)
      }
    }
  },
  props: {
    dialogVisible: false
  },
  methods: {
    ...mapActions(['setBpmValue', 'startProcess']),
    completeStepOKBtnClicked () {
      this.okBtnShow = false
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
        console.log('弹框必须选人校验开始 ->')
        // 如果是可选多人签核需要更新数据中心targetUsers，如果存在targetUsers（可选多人和单人签核）则需要校验不为空
        console.log('this.targetUsers:', this.targetUsers)
        if (this.approvalType.approvalTypeMultiSelect === this.target.nextTaskType) {
          this.updateTargetUsers({me: this})
        }
        if ((this.approvalType.approvalTypeMultiSelect === this.target.nextTaskType ||
          this.approvalType.approvalTypeSingle === this.target.nextTaskType) &&
          this.targetUsers.length < 1) {
          this.alert(this.bpmcoreI18n.textFinishTask)
          this.okBtnShow = true
          this.setBpmValue({akey: 'totalShadeShow', avalue: false})
          return
        }
        console.log('弹框必须选人校验完成 ->')
        this.$emit('completeStepOKBtnClicked')
      }, 100)
    },
    completeStepCancelBtnClicked () {
      this.okBtnShow = true
      // 点击取消，隐藏dialog,校验位置为false，防止首次成功后续失败的情况
      this.setBpmValue({akey: 'isFlowDialogVisible', avalue: false})
      this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
      this.setBpmValue({akey: 'isConfirmVerify', avalue: false})
    },
    updateTargetUsers (obj) {
      let targetUsers = []
      obj.me.setBpmValue({akey: 'targetUsers', avalue: targetUsers})
      console.log('this.targetUsers length:', this.targetUsers.length)
      if (this.approvalType.approvalTypeMultiSelect === this.target.nextTaskType) {
        for (var j = 0; j < this.target.nextUsers.length; j++) {
          let nextUser = this.target.nextUsers[j]
          if (nextUser && nextUser.checkboxFlag) {
            targetUsers[targetUsers.length] = nextUser.userId
          }
        }
        console.log('this.targetUsers length:', this.targetUsers.length)
        obj.me.setBpmValue({akey: 'targetUsers', avalue: targetUsers})
      }
    },
    commentsClick () {
      console.log('comments clicked before>>>>>>>>>>>>', this.comments)
      if (this.comments === '同意' || this.comments.toUpperCase() === 'OK' || this.comments === '同意@OK') {
        this.setBpmValue({akey: 'comments', avalue: ''})
      }
      console.log('comments clicked after>>>>>>>>>>>>', this.comments)
    },
    commentsBlur () {
      console.log('comments blur before>>>>>>>>>>>>', this.comments)
      if (this.comments === '') {
        this.setBpmValue({akey: 'comments', avalue: (this.lang === 'zh' ? '同意' : 'OK')})
      }
      console.log('comments blur after>>>>>>>>>>>>', this.comments)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
