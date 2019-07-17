<template>
  <el-card>
    <div slot="header" style="font-size: 14px;text-align: left">{{bpmcoreI18n.baseInfo}}</div>
    <el-form ref="inst"
             align="left"
             size="mini"
             label-width="120px"
             :model="inst">
      <el-row :gutter="10">
        <el-col :span="24"><div>
          <el-form-item :label="bpmcoreI18n.applyNumber" >
            {{showBaseInfo.btNo}}
          </el-form-item></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>
          <el-form-item  :label="bpmcoreI18n.applyDate">
            {{showBaseInfo.createTime}}
          </el-form-item></div>
        </el-col>
        <el-col :span="12"><div>
          <el-form-item :label="bpmcoreI18n.applicant"  >
            {{showBaseInfo.userName}}
          </el-form-item></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>
          <el-form-item :label="bpmcoreI18n.applyCompany"  >
            {{showBaseInfo.deptName}}
          </el-form-item></div>
        </el-col>
        <el-col :span="12"><div>
          <el-form-item :label="bpmcoreI18n.applyPhone"  >
            {{showBaseInfo.mobile}}
          </el-form-item></div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'basearea',
  data () {
    return {
      activeBase: ['1']
    }
  },
  methods: {
  },
  props: {
    title: ''
  },
  computed: {
    ...mapState(['inst', 'bpmcoreI18n']),
    showBaseInfo: function () {
      let baseInfo = {}
      baseInfo.btNo = ''
      baseInfo.createTime = ''
      baseInfo.userName = ''
      baseInfo.deptName = ''
      baseInfo.btNo = this.inst.btNo
      baseInfo.createTime = this.toLocaleDate(this.inst.createTime)
      baseInfo.userName = this.inst.userName
      if (this.inst && this.inst.deptNameEn != null && typeof this.inst.deptNameEn !== 'undefined' && this.inst.deptNameEn !== '') {
        baseInfo.deptName = this.inst.deptName + '(' + this.inst.deptNameEn + ')'
      } else {
        baseInfo.deptName = this.inst.deptName
      }
      if (this.inst && this.inst.userInfo) {
        baseInfo.mobile = (!this.inst.userInfo.mobile ? '' : this.inst.userInfo.mobile) + (!this.inst.userInfo.officePhone ? '' : '/' + this.inst.userInfo.officePhone)
      }
      return baseInfo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    font-size: 14px;
  }
  .blockBasicLi {
    line-height: 27px;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #e3e3e3;
    background-color: #eff3f6;
  }
  ul, li {
    list-style: none outside none;
    padding: 0px;
    margin: 0px;
    min-height: 3px;
    border: 0;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
</style>
