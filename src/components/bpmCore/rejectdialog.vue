<template>
  <el-dialog :show-close="false"
             align="center"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :title="bpmcoreI18n.titleReject"
             width="40%">
    <el-form ref="inst"
             align="left"
             size="mini"
             label-width="120px">
      <el-form-item :label="bpmcoreI18n.textReject" >
        <el-select v-model="rejectToActivity" size="mini">
          <el-option v-for="(val,i) in rejectActivities"
                     :key="i"
                     :label="val.activityName"
                     :value="val.activityId">
          </el-option>
        </el-select>
        <span style="font-size:14px;color:red;font-weight:bold;margin-left:20px">{{commentNotNull}}</span>
      </el-form-item>
      <el-form-item :label="bpmcoreI18n.comments" >
        <el-input  v-model="displayComments"
                   type="textarea"
                   :autosize="{minRows: 3,maxRows: 6}"
                   maxlength="300"
                   @keyup.enter.native=""
        ></el-input>
        <span style="color: blue;">({{showInputLength}}/300)</span>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <div align="center">
        <el-button v-show="okBtnShow"
                   type="primary"plain
                   size="small"
                   @click="rejectOKBtnClicked">
          {{bpmcoreI18n.btnOk}}
        </el-button>
        <el-button type="primary"plain
                   size="small"
                   @click="rejectCancelBtnClicked">
          {{bpmcoreI18n.btnCancel}}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'rejectdialog',
  data () {
    return {
      okBtnShow: true,
      commentNotNull: ''
    }
  },
  computed: {
    ...mapState(['bpmcoreI18n', 'rejectTo', 'rejectActivities', 'bizData', 'comments', 'targetUsers', 'target', 'lang', 'approvalType', 'approvalTypeEnum']),
    showInputLength: function () {
      return this.comments.length + ''
    },
    displayComments: {
      get () {
        return this.comments
      },
      set (value) {
        this.setBpmValue({akey: 'comments', avalue: value})
      }
    },
    rejectToActivity: {
      get () {
        return this.rejectTo
      },
      set (value) {
        this.setBpmValue({akey: 'rejectTo', avalue: value})
      }
    }
  },
  props: {
    dialogVisible: false
  },
  methods: {
    ...mapActions(['setBpmValue', 'startProcess']),
    rejectOKBtnClicked () {
      // 隐藏确认按钮，防止快速连续点击
      this.okBtnShow = false
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        console.log('reject dialog selected rejectTo activity:', this.rejectTo)
        if (this.rejectTo === null || this.rejectTo.trim() === '') {
          this.alert(this.bpmcoreI18n.msgRejectNotConfig)
          this.okBtnShow = true
          this.setBpmValue({akey: 'totalShadeShow', avalue: false})
          return
        }
        if (this.comments === null || this.comments.trim() === '') {
          this.commentNotNull = this.bpmcoreI18n.msgCommentsRequired
          this.okBtnShow = true
          this.setBpmValue({akey: 'totalShadeShow', avalue: false})
          return
        }
        this.setBpmValue({akey: 'isRejectVerify', avalue: false})
        this.$emit('rejectOKBtnClicked')
      }, 100)
    },
    rejectCancelBtnClicked () {
      this.okBtnShow = true
      // 点击取消，隐藏dialog,校验位置为false，防止首次成功后续失败的情况
      this.setBpmValue({akey: 'isRejectFlowDialogVisible', avalue: false})
      this.setBpmValue({akey: 'isRejectVerify', avalue: false})
      this.setBpmValue({akey: 'isRejectConfirmVerify', avalue: false})
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
