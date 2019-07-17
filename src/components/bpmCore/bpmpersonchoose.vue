<template>
  <div>
    <el-container v-loading="dialogloading">
      <el-aside width="250px">
        <el-header height="40px">
          <el-input v-model="inputtext"
                    placeholder="search"
                    @keyup.enter.native="null"
                    size="small">
            <i slot="suffix"
               class="el-input__icon el-icon-search" />
          </el-input>
        </el-header>
        <el-main>
          <bpmcorepersontree
            :treeJson="treeJson"
            :filterText="inputtext"
            v-model="selectItem"/>
        </el-main>
      </el-aside>
      <el-main style="padding: 0px;">
        <el-form @submit.native.prevent
          label-width="80px">
          <el-form-item :label="bpmcoreI18n.searchTitle">
            <el-input v-model="nameSearchKey"
                      :placeholder="bpmcoreI18n.searchTitle"
                      @keyup.enter.native="queryKeywordsUserList"
                      size="small">
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="queryKeywordsUserList"
              />
            </el-input>
          </el-form-item>
        </el-form>
        <table cellspacing="0" cellpadding="0"
               class="el-table el-table--fit el-table--striped el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--mini">
          <thead class="el-table__header-wrapper">
          <tr>
            <td width="5%">
              <input style="display:none" title="" onclick="checkAll(this);" id="checkAll" type="checkbox">
            </td>
            <td width="15%" style="padding-left: 8px;">ID</td>
            <td width="15%" style="padding-left: 8px;">{{bpmcoreI18n.name}}</td>
            <td width="45%" style="padding-left: 8px;">{{bpmcoreI18n.department}}</td>
            <td width="20%" style="padding-left: 8px;">{{bpmcoreI18n.employeeNo}}</td>
          </tr>
          </thead>
          <tbody id="dataTable">
          <tr style="height:18px;" v-for="(val,i) in choiceArray" :key="i">
            <td v-if="!multSelect" style="text-align: center">
              <input name="userCheck" title="" v-model="selectValue" type="radio"
                     @change="radioChange"
                     :value="val">
            </td>
            <td v-else style="text-align: center">
              <input name="userCheck" title="" v-model="checkArray" type="checkbox"
                     @change="checkBoxChange"
                     :value="val">
            </td>
            <td style="padding-left: 8px;"><font color="red">{{val.uid}}</font></td>
            <td style="padding-left: 8px;">{{val.cn}}</td>
            <td style="padding-left: 8px;">{{val.displayname}}</td>
            <td style="padding-left: 8px;">{{val.employeenumber}}</td>
          </tr>
          </tbody>
        </table>
        <el-pagination :total="userMax"
                       @size-change="pageSizeChange"
                       @current-change="pageChange"
                       :page-size="choicePageCount"
                       :current-page="choicePageNumber+1"
                       show-total
        >
        </el-pagination>
      </el-main>
      <el-aside width="200px">
        <el-container>
          <el-header>
            {{bpmcoreI18n.chosens}}
          </el-header>
          <el-main>
            <el-table :data="selectArray"
                      :show-header="false"
                      highlight-current-row
                      @current-change="changeSelect"
                      height="200px"
                      size="mini"
                      style="width: 100%">
              <el-table-column label="">
                <template slot-scope="props">
                  {{props.row.cn}}({{props.row.uid}})
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer>
            <el-button-group size="mini">
              <el-button size="mini" @click="delete_">
                {{bpmcoreI18n.remove}}
              </el-button>
              <el-button size="mini"  @click="deleteAll">
                {{bpmcoreI18n.removeAll}}
              </el-button>
            </el-button-group>
          </el-footer>
        </el-container>
      </el-aside>
    </el-container>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="btnClick(1)" type="primary" plain size="small">{{bpmcoreI18n.btnOk}}</el-button>
        <el-button @click="btnClick(2)" type="primary" plain size="small">{{bpmcoreI18n.btnCancel}}</el-button>
      </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import bpmcorepersontree from './bpmcorepersontree'
var DATATREE = require('../js/ldap_treedata.js')

export default {
  name: 'bpmpersonchoose',
  components: {
    bpmcorepersontree
  },
  model: {
    prop: 'userList',
    event: 'itemChanged'
  },
  props: {
    userList: {
      type: Array,
      default () {
        return []
      }
    },
    multSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ldap: {
        departmentArray: [], // 网上获取组织列表
        departmentData: [], // 通过组织列表计算出的组织树
        userArray: [] // 用户列表
      },
      nameSearchKey: '', // 人名搜索关键字
      selectItem: {}, // 选中部门
      selectArray: [], // 右侧选中人员列表
      checkArray: [], // 多选时主界面中选中列表，为selectArray的子集
      selectValue: '', // 单选时主界面值
      inputtext: '', // 部门关键字搜索
      choicePageCount: 10,
      // 当前页码
      choicePageNumber: 0,
      chooseSelect: [], // 右侧选中人员中高亮人员
      ldapLoading: false
    }
  },
  computed: {
    ...mapState(['bpmcoreI18n']),
    dialogloading () {
      return this.ldapLoading || (this.$store.state.ldapdialogloading !== 0)
    },
    treeJson: {
      get () {
        return this.ldap.departmentData
      },
      set (value) {
        this.ldap.departmentData = value
      }
    },
    treeArray () {
      return this.ldap.departmentArray
    },
    userMax () {
      console.log(this.ldap.userArray)
      if (this.ldap.userArray && this.ldap.userArray.length) { return this.ldap.userArray.length }
      return 0
    },
    choiceArray () {
      console.log('.......choiceUserArray', this.ldap.userArray)
      console.log('0000000->', this.choicePageNumber, this.choicePageCount)
      return this.ldap.userArray.slice(this.choicePageNumber * this.choicePageCount, this.choicePageNumber * this.choicePageCount + this.choicePageCount)
    }
  },
  watch: {
    choiceArray (to) {
      // 复原选择
      this.checkArray = []
      this.selectValue = ''
    },
    userList (to) {
      console.log('tree userList:', to)
      this.selectArray = to
    },
    selectArray (to) {
      this.chooseSelect = []
    },
    selectItem (to) {
      console.log('tree node selected:', to)
      if (to && to !== {}) {
        console.log('--------------set name search key---------------------')
        this.ldapLoading = true
        setTimeout(() => {
          this.queryUserListByOrgId(this.$store, {me: this, inOrgUid: to.id})
          this.ldapLoading = false
        }, 100)
      }
    },
    treeArray (to) {
      let toclown = to.concat()
      this.treeJson = [DATATREE.makeTreeJsonByData(DATATREE.initTreeArray(toclown))]
    }
  },
  created () {
    // 异步获取数据操作
    if (!this.treeArray || this.treeArray.length <= 0) {
      console.log('load all orgs........')
      this.ldapLoading = true
      setTimeout(() => {
        this.loadAllOrgs(this.$store, {me: this, async: true})
        this.ldapLoading = false
      }, 100)
    }
    // 初始化将model绑定至selectArray
    this.selectArray = this.userList
  },
  methods: {
    ...mapActions(['setBpmValue']),
    changeSelect (currentRow) {
      console.log('currentRow', currentRow)
      this.chooseSelect = [currentRow]
    },
    loadAllOrgs (store, paramObj) {
      store.state.ldapdialogloading++
      this.httpBpm({
        inputParameter: JSON.stringify({
          'inUserIds': '',
          'inFilter': '',
          'inOrgUid': '00000001',
          'inIsDisplayAll': '',
          'inRadio': '1',
          'inDisplay': '1',
          'inLang': 'zh'
        }),
        async: paramObj.async,
        'apiName': 'EBVCA@AJAX_LDAP001_loadAllOrgAndRootGroup'
      }, data => {
        if (data.returnCode === '000000') {
          let jsonList = JSON.parse(data.resultData)
          if (jsonList && jsonList.length > 0) {
            this.ldap.departmentArray = jsonList
          } else {
            this.ldap.departmentArray = []
          }
        } else {
          // paramObj.me.alert('获取部门树失败')
          paramObj.me.alert(paramObj.me.getResource('alert.unknown.error') + ':loadAllOrgs')
          this.ldap.departmentArray = []

        }
        store.state.ldapdialogloading--
      }, (data, e) => {
        console.log('=======ldap tree data=======', data)
        store.state.ldapdialogloading--
      })
    },
    queryUserListByOrgId (store, paramObj) {
      store.state.ldapdialogloading++
      this.httpBpm({
        inputParameter: JSON.stringify({
          'inUserIds': '',
          'inOrgUid': paramObj.inOrgUid,
          'inLang': 'zh'
        }),
        'apiName': 'EBVCA@AJAX_LDAP002_QueryUserListByOrgUid'
      }, data => {
        if (data.returnCode === '000000') {
          let jsonList = JSON.parse(data.resultData)
          if (jsonList && jsonList.length > 0) {
            let array = []
            for (let j in jsonList) {
              let item = {
                uid: jsonList[j].uid,
                cn: jsonList[j].wanhuaCn,
                displayname: jsonList[j].orgName,
                employeenumber: jsonList[j].employeeNumber
              }
              array.push(item)
            }
            this.ldap.userArray = array
          } else {
            this.ldap.userArray = []
          }
        } else {
          // paramObj.me.alert('获取用户列表失败')
          paramObj.me.alert(paramObj.me.getResource('alert.unknown.error') + ':queryUserListByOrgId')
          this.ldap.userArray = []
        }
        store.state.ldapdialogloading--
      }, (data, e) => {
        console.log('=======ldap tree data=======', data)
        store.state.ldapdialogloading--
      })
    },
    queryUserListByKeyword (store, paramObj) {
      store.state.ldapdialogloading++
      this.httpBpm({
        inputParameter: JSON.stringify({
          'inOrgId': '00000001',
          'inKeywords': paramObj.inKeywords,
          'inAuthUid': '0'
        }),
        'apiName': 'EBVCA@AJAX_LDAP003_QueryKeywordsUserList'
      }, data => {
        if (data.returnCode === '000000') {
          let jsonList = JSON.parse(data.resultData)
          if (jsonList && jsonList.length > 0) {
            let array = []
            for (let j in jsonList) {
              let item = {
                uid: jsonList[j].uid,
                cn: jsonList[j].wanhuaCn,
                displayname: jsonList[j].orgName,
                employeenumber: jsonList[j].employeeNumber
              }
              array.push(item)
            }
            this.ldap.userArray = array
          } else {
            this.ldap.userArray = []
          }
        } else {
          // paramObj.me.alert('获取用户列表失败')
          paramObj.me.alert(paramObj.me.getResource('alert.unknown.error') + ':queryUserListByKeyword')
          this.ldap.userArray = []
        }
        store.state.ldapdialogloading--
      }, (data, e) => {
        console.log('=======ldap tree data=======', data)
        store.state.ldapdialogloading--
      })
    },
    btnClick (aIndex) {
      if (aIndex === 2) {
        this.$emit('closeClicked')
        this.$emit('itemChanged', [])
      } else {
        this.$emit('selectClicked', this.selectArray.length > 0 ? this.selectArray : [])
        this.$emit('itemChanged', this.selectArray.length > 0 ? this.selectArray : [])
      }
      // 清空选择
      // this.selectArray = []
      this.checkArray = []
      this.selectValue = ''
    },
    delete_ () {
      if (!this.chooseSelect || this.chooseSelect.length !== 1) {
        return
      }
      // this.selectArray.splice(this.chooseSelect[0], 1)
      // modified by xiahui 20181203
      let index = this.getArrayIndexOf(this.selectArray, this.chooseSelect[0])
      this.selectArray.splice(index, 1)
      console.log('delete_ this.selectArray---------->', this.selectArray)
    },
    deleteAll () {
      this.selectArray.splice(0, this.selectArray.length)
    },
    queryKeywordsUserList () {
      // console.log('query....', this.nameSearchKey)
      if (!this.nameSearchKey || this.nameSearchKey.length <= 0) { return }
      this.queryUserListByKeyword(this.$store, {me: this, inKeywords: this.nameSearchKey})
    },
    pageChange (nowPage) {
      console.log(nowPage)
      this.choicePageNumber = nowPage - 1
    },
    pageSizeChange (nowPageSize) {
      console.log(nowPageSize)
      this.choicePageCount = nowPageSize
    },
    radioChange () {
      console.log('radio select test selectValue', this.selectValue)
      if (!this.multSelect) {
        if (this.selectValue) {
          this.selectArray = [this.selectValue]
        } else {
          this.selectArray = []
        }
      }
    },
    checkBoxChange () {
      console.log('radio select test checkArray', this.checkArray)
      console.log('radio select test choiceArray', this.choiceArray)
      if (this.multSelect) {
        // 1.删除selectArray中存在在choiceArray的数据
        let cacheArray = {}
        for (let i in this.choiceArray) {
          cacheArray[this.choiceArray[i]['uid']] = true
        }
        let cacheData = []
        for (let j in this.selectArray) {
          if (!cacheArray[this.selectArray[j]['uid']]) {
            cacheData.push(this.selectArray[j])
          }
        }
        // 2.合并selectArray和checkArray
        this.selectArray = cacheData.concat(this.checkArray)
      }
    },
    getArrayIndexOf (array, item) {
      for (let i=0; i< array.length; i++) {
        if (array[i] === item) {
          return i
        }
      }
      return -1
    },
    initBpmPersonChoose () {
      // 清空选择
      // this.selectArray = []
      this.checkArray = []
      this.selectValue = ''
      // 清空中间列表
      this.ldap.userArray = []
      // 清空人员搜索关键字
      this.nameSearchKey = ''
      // 清空部门搜索关键字
      this.inputtext= ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
