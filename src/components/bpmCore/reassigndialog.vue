<template>
  <el-dialog :show-close="false"
             align="center"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :title="showContent"
             width="40%"><!--880, 600-->
    <el-form ref="inst"
             align="left"
             size="mini"
             label-width="120px">
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
    </el-form>
    <div slot="footer">
      <div align="center">
        <el-button v-show="okBtnShow"
                   type="primary" plain
                   size="small"
                   @click="reassignOKBtnClicked">
          {{bpmcoreI18n.btnOk}}
        </el-button>
        <el-button
          type="primary" plain
          size="small"
          @click="reassignCancelBtnClicked">
          {{bpmcoreI18n.btnCancel}}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'reassigndialog',
  data () {
    return {
      okBtnShow: true
    }
  },
  computed: {
    ...mapState(['bpmcoreI18n', 'C_COMPLETE_TYPE_COMPLETEINVOLVE', 'C_OPERATION_REASSIGN', 'C_OPERATION_INVOLVE', 'advanceEnum', 'reassignType', 'bizData', 'comments', 'targetUsers', 'comments', 'target', 'lang', 'approvalType', 'approvalTypeEnum']),
    displayComments: {
      get () {
        return this.comments
      },
      set (value) {
        this.setBpmValue({akey: 'comments', avalue: value})
      }
    },
    showInputLength: function () {
      return this.comments.length + ''
    },
    // 展示下一环节名称
    showActivityName: function () {
      if (this.lang === 'zh') {
        return this.target.nextActivities[0].activityName.substr(0, this.target.nextActivities[0].activityName.indexOf('@'))
      } else {
        return this.target.nextActivities[0].activityName.substr(this.target.nextActivities[0].activityName.indexOf('@') + 1)
      }
    },
    // 标题
    showTitle: function () {
      if (this.reassignType === this.C_COMPLETE_TYPE_COMPLETEINVOLVE || this.reassignType === this.C_OPERATION_INVOLVE) {
        return this.bpmcoreI18n.titleConfirmInvolve
      } else if (this.reassignType === this.C_OPERATION_REASSIGN) {
        return this.bpmcoreI18n.titleConfirmTurndo
      }
    },
    // 内容
    showContent: function () {
      if (this.reassignType === this.C_OPERATION_REASSIGN) {
        return this.bpmcoreI18n.textConfigmTurndo + ': ' + this.showReassignUser
      } else if (this.reassignType === this.C_OPERATION_INVOLVE) {
        return this.bpmcoreI18n.textConfirmInvolve + ': ' + this.showReassignUser
      } else if (this.reassignType === this.C_COMPLETE_TYPE_COMPLETEINVOLVE) {
        return this.bpmcoreI18n.textConfirmReinvolve + ': ' + this.showReassignUser
      }
    }
  },
  props: {
    showReassignUser: '',
    dialogVisible: false
  },
  methods: {
    ...mapActions(['setBpmValue', 'startProcess']),
    validInputLength () {
      console.log(this.comments)
    },
    reassignOKBtnClicked () {
      this.okBtnShow = false
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        this.setBpmValue({akey: 'isReassignVerify', avalue: false})
        this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
        this.$emit('reassignOKBtnClicked')
      }, 100)
    },
    reassignCancelBtnClicked () {
      this.okBtnShow = true
      // 点击取消，隐藏dialog,校验位置为false，防止首次成功后续失败的情况
      this.setBpmValue({akey: 'isReassignFlowDialogVisible', avalue: false})
      this.setBpmValue({akey: 'isReassignVerify', avalue: false})
      this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
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
<style scoped>
  .smallLay {
    width: 600px;
    height: 194px;
    background-color: #cbd3e0;
    border: 1px solid #909497;
    color: #333;
    line-height: 24px;
    text-align: left;
    -webkit-box-shadow: 5px 2px 6px #000;
    -moz-box-shadow: 3px 3px 6px #555;
  }
  .smallLayTitle {
    background: url(/static/images/ecsbpm/smallLayBG.jpg) repeat-x center top;
    height: 32px;
    color: #48515a;
  }
  .smallLayTitle b {
    padding-left: 12px;
    color: #48515a;
    font-size: 14px;
    line-height: 33px;
  }
  .smallLayContent {
    background-color: #fff;
    border: 1px solid #9da4be;
    height: 131px;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 12px;
  }
  .commentsTxtare {
    height: 96px;
    width: 550px;
  }
</style>
