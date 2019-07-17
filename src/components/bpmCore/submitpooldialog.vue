<template>
  <el-dialog :show-close="false"
             align="center"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :title="bpmcoreI18n.textTaskSubmit+'“'+showActivityName+'”'+bpmcoreI18n.textTaskPool"
             width="40%"><!--880, 600-->
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
    </el-form>
    <div slot="footer">
      <div align="center">
        <el-button v-show="okBtnShow"
                   type="primary"plain
                   size="small"
                   @click="completePoolOKBtnClicked">
          {{bpmcoreI18n.btnOk}}
        </el-button>
        <el-button type="primary"plain
                   size="small"
                   @click="completePoolCancelBtnClicked">
          {{bpmcoreI18n.btnCancel}}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'submitpooldialog',
  data () {
    return {
      okBtnShow: true
    }
  },
  computed: {
    ...mapState(['bpmcoreI18n', 'bizData', 'comments', 'targetUsers', 'target', 'lang', 'approvalType', 'approvalTypeEnum']),
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

    completePoolOKBtnClicked () {
      this.okBtnShow = false
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
        this.$emit('completePoolOKBtnClicked')
      }, 100)
    },
    completePoolCancelBtnClicked () {
      this.okBtnShow = true
      // 点击取消，隐藏dialog,校验位置为false，防止首次成功后续失败的情况
      this.setBpmValue({akey: 'isFlowDialogVisible', avalue: false})
      this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
      this.setBpmValue({akey: 'isConfirmVerify', avalue: false})
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
  .smallLayTitle b {
    padding-left: 12px;
    color: #48515a;
    font-size: 14px;
    line-height: 33px;
  }
</style>
