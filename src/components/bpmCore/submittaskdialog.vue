<template>
  <el-dialog :show-close="false"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             align="center"
             :visible.sync="dialogVisible"
             :title="bpmcoreI18n.titleTaskSubmit+'-'+bpmcoreI18n.textOtherUsers"
             width="40%"><!--880, 600-->
    <el-form ref="inst"
             align="left"
             size="mini"
             label-width="100px">
      <!--人多时，增加滚轮-->
      <el-form-item :label="bpmcoreI18n.textOtherUsers">
      <!--<el-form-item label="" >-->
        <div style="max-height:180px;overflow: auto;">
          <span v-for="(val,i) in target.nextUsers" :key="i">
            <br v-if="i>0">
            {{val.displayName}}-{{val.deptName}}
          </span>
        </div>
     </el-form-item>
      <el-form-item :label="bpmcoreI18n.comments">
        <el-input  v-model="displayComments"
                   type="textarea"
                   :autosize="{minRows: 3,maxRows: 6}"
                   @focus="commentsClick"
                   @blur="commentsBlur"
                   maxlength="300"
                   @keyup.enter.native=""></el-input>
        <span style="color: blue;">({{showInputLength}}/300)</span>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <div align="center">
        <el-button v-show="okBtnShow"
                   type="primary"plain
                   size="small"
                   @click="completeTaskOKBtnClicked">
          {{bpmcoreI18n.btnOk}}
        </el-button>
        <el-button type="primary"plain
                   size="small"
                   @click="completeTaskCancelBtnClicked">
          {{bpmcoreI18n.btnCancel}}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'bpmDSubmittaskdialog',
  data () {
    return {
      okBtnShow: true
    }
  },
  computed: {
    ...mapState(['bpmcoreI18n', 'bizData', 'comments', 'targetUsers','target', 'lang', 'approvalType', 'approvalTypeEnum']),
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
    }
  },
  props: {
    dialogVisible: false
  },
  methods: {
    ...mapActions(['setBpmValue', 'startProcess']),
    completeTaskOKBtnClicked () {
      this.okBtnShow = false
      this.setBpmValue({akey: 'totalShadeShow', avalue: true})
      setTimeout(() => {
        this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
        this.$emit('completeTaskOKBtnClicked')
      }, 100)
    },
    completeTaskCancelBtnClicked () {
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
