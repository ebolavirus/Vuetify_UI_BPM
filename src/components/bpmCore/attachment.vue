<template>
  <div class="attachmentclass">
  <el-collapse >
    <el-collapse-item align="left" :title="(lang === langEnum.zh ? '附件' : 'Attachment')+'('+ attachListLength +')'">
        <iframe
          :src="attachURL"
          width="100%"
          height="300px" />
    </el-collapse-item>
  </el-collapse >
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'attachment',
  props: {
    instanceId: { // 通常绑定inst.id或者通常绑定inst.id或者app + app 通常绑定tsId+app/att
      type: String,
      default: '-1000'
    },
    allowCreate: {
      type: Boolean,
      default: true
    },
    allowUpdate: {
      type: Boolean,
      default: true
    },
    allowDelete: {
      type: Boolean,
      default: true
    },
    allowUpdateOthers: {
      type: Boolean,
      default: false
    },
    allowDeleteOthers: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['inst', 'lang', 'langEnum', 'attachListLength']),
    attachURL () {
      if (!(this.instanceId && this.instanceId.indexOf('PIID') > -1)) {
        return ''
      }
      let url = window.location.protocol + '//' + window.location.host
      console.log('host----->', window.location.host)
      if (url.indexOf('localhost:80') > -1) {
        url = 'http://bpmdev02.whchem.com' // 本地调试链接开发，需要登录或者单点
      }
      url += '/teamworks/fastExecuteServiceByName.jsp?processApp=EBCOMMA&serviceName=UI_Attachment'
      url += '&tw.local.instanceId=' + this.instanceId
      url += '&tw.local.allowCreate=' + this.allowCreate
      url += '&tw.local.allowUpdate=' + this.allowUpdate
      url += '&tw.local.allowDelete=' + this.allowDelete
      url += '&tw.local.allowUpdateOthers=' + this.allowUpdateOthers
      url += '&tw.local.allowDeleteOthers=' + this.allowDeleteOthers
      console.log('attachframe instanceId is......', this.instanceId)
      return url
    },
    attachListLength () {
      let listLength = 0
      if (this.instanceId && this.instanceId.indexOf('PIID') > -1) {
        this.httpBpmCore({
          'tsPiid': this.instanceId,
          'async': false,
          'apiName': 'EBCOMMA@AJAX_RetrieveAttachList'
        }, data4 => {
          console.log('getAttachmentListLength  success-> data :', data4)
          if (data4 && data4.attachList && data4.attachList.items && data4.attachList.items.length > 0) {
            console.log('getAttachmentListLength  success-> data lenth:', data4.attachList.items.length)
            listLength = data4.attachList.items.length
          }
        }, (data4, e) => {
          console.log('getAttachmentListLength  error-> data :', data4)
        })
      }
      console.log('attachframe getAttachmentListLength listLength:', listLength)
      return listLength
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .attachmentclass .el-collapse-item__header {
    padding: 0px 20px;
    height: 48px;
    line-height: 48px;
    color: #303133;
    cursor: pointer;
    border-bottom: 1px solid #ebeef5;
    font-size: 13px;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
  }
</style>
