<template>
  <bpmprocesslayout title="MobileTestV3 MobileTestV3 MobileTestV3 "
             @submitVerify="submitVerify"
             @confirmVerify="confirmVerify"
             @rejectVerify="rejectVerify"
             @rejectConfirmVerify="rejectConfirmVerify"
             @cancelVerify="cancelVerify"
             @reassignVerify="reassignVerify">
    <template slot="main">
      <wanhuabutton1 v-model="inputValue" />
      <wanhuabutton2 v-model="inputValue">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </wanhuabutton2>
      <el-input v-model="inputValue" />
      <basearea/>
      <basearea/>
      <basearea/>
      <basearea/>
      <basearea/>
      <basearea/>
      <attachment :instanceId="inst.id"/>
    </template>
  </bpmprocesslayout>
  <!--<div>-->
    <!--<diagram/>-->
    <!--<attachment instanceId="PIID-3a712ce3-8aac-4dad-8755-94a4a6d390ba"/>-->
  <!--</div>-->
</template>
<script>
import bpmprocesslayout from '../components/bpmCore/bpmprocesslayout.vue'
import attachment from '../components/bpmCore/attachment.vue'
import basearea from '../components/bpmCore/basearea.vue'

import {mapState, mapActions} from 'vuex'
export default {
  name: 'bpmcore',
  components: {
    bpmprocesslayout,
    attachment,
    basearea
  },
  data () {
    return {
      isShow: false,
      size: 18,
      height: 36,
      inputValue: '222222'
    }
  },
  computed: {
    ...mapState(['inst'])
  },
  methods: {
    ...mapActions(['setBpmValue', 'loadResource']),
    submitVerify () {
      this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
      console.log('**************提交校验通过**************')
      this.setBpmValue({akey: 'isSubmitVerify', avalue: true})
    },
    confirmVerify () {
      this.setBpmValue({akey: 'isConfirmVerify', avalue: false})
      console.log('**************确认校验通过**************')
      this.setBpmValue({akey: 'isConfirmVerify', avalue: true})
    },
    rejectVerify () {
      this.setBpmValue({akey: 'isRejectVerify', avalue: false})
      console.log('**************驳回校验通过**************')
      this.setBpmValue({akey: 'isRejectVerify', avalue: true})
    },
    // 点击驳回弹框中的确认按钮触发的方法
    rejectConfirmVerify () {
      this.setBpmValue({akey: 'isRejectConfirmVerify', avalue: false})
      console.log('rejectConfirmVerify 校验业务数据开始- >')
      // todo 业务校验
      console.log('rejectConfirmVerify 校验业务数据结束- >')
      this.setBpmValue({akey: 'isRejectConfirmVerify', avalue: true})
    },
    reassignVerify () {
      this.setBpmValue({akey: 'isReassignVerify', avalue: false})
      console.log('reassignVerify 校验业务数据开始- >')
      this.setBpmValue({akey: 'isReassignVerify', avalue: true})
    },
    cancelVerify () {
      this.setBpmValue({akey: 'isCancelVerify', avalue: false})
      console.log('cancelVerify 校验业务数据开始- >')
      this.setBpmValue({akey: 'isCancelVerify', avalue: true})
    }
  },
  mounted () {
    this.loadResource({me: this})
  }
}
</script>

<style>
</style>
