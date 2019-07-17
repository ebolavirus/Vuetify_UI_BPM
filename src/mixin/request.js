import $ from 'jquery'
let envCurr = 'dev'
let adapterConf = {
  dev: {
    url: 'http://bpmadapter.clouddev.whchem.com/api/adapter/requestData'
  },
  qas: {
    url: 'http://bpmadapter.clouddev.whchem.com/api/adapter/requestData'
  },
  uat: {
    url: 'http://bpmadapter.clouddev.whchem.com/api/adapter/requestData'
  },
  prd: {
    url: 'http://bpmadapter.clouddev.whchem.com/api/adapter/requestData'
  }
}

let bpmConf = {
  dev: {
    url: 'http://bpmdev02.whchem.com'
  },
  qas: {
    url: 'http://bpmqas02.whchem.com'
  },
  uat: {
    url: 'http://bpmuat.whchem.com'
  },
  prd: {
    url: 'http://bpms.whchem.com'
  }
}
let apiUri = '/rest/bpm/wle/v1/service/'

let mixins = {
  data: function () {
    return {}
  },
  methods: {

    // 基于jquery封装的适用于ajax请求的底层服务，不对外暴露
    httpBpmBase (paramObj, succFunc, failFunc) {
      // 参数校验
      if (!paramObj) {
        failFunc && failFunc('', '入参对象不能为空')
        return
      }
      if (!paramObj.apiName) {
        failFunc && failFunc('', '入参对象里无apiName，例如bpm1')
        return
      }
      let apiName = paramObj.apiName
      let async = false
      if (typeof paramObj.async !== 'undefined' && paramObj.async === true) {
        async = paramObj.async
      }
      delete paramObj.async
      delete paramObj.apiName
      let paramStr = '&params=' + encodeURIComponent(JSON.stringify(paramObj))
      let bpmUrl = apiUri + apiName + '?action=start&createTask=false&parts=all' + paramStr

      let ajaxConf = {}
      // 如果是本地开发，那么使用bpmadmin进行认证,并且调用adapter
      console.log('http request window.location.href->', window.location.href)
      if (window.location.href.indexOf('localhost:80') > -1) {
        let adapterUrl = adapterConf[envCurr].url
        let bpmHost = bpmConf[envCurr].url
        console.log('请求地址：', bpmHost + bpmUrl)
        let adapterParam = {
          paramIn: '',
          url: bpmHost + bpmUrl
        }
        ajaxConf = {
          url: adapterUrl,
          header: {
            Authorization: 'Basic YnBtYWRtaW46CWJwbWlzb2s=',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          async: async,
          type: 'post',
          data: adapterParam,
          success: (data, status, xhr) => {
            console.log('请求成功：', data)
            succFunc && succFunc(data)
          },
          error: function (data) {
            console.log('请求失败')
            failFunc && failFunc(data, '请求失败')
          }
        }
      } else {
        console.log('请求地址 bpmUrl：', bpmUrl)
        ajaxConf = {
          url: bpmUrl,
          header: {
            // Authorization: 'Basic YnBtYWRtaW46CWJwbWlzb2s=', // 线上环境不需要进行认证
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          async: async,
          type: 'post',
          data: '',
          success: (data, status, xhr) => {
            console.log('请求成功：', data)
            succFunc && succFunc(data)
          },
          error: function (data) {
            console.log('请求失败', data)
            failFunc && failFunc(data, '请求失败')
          }
        }
      }
      $.ajax(ajaxConf)
    },
    // 基于httpBase封装的暴露给开发者的服务，适用范围为流程开发人员
    httpBpm (paramObj, succFunc, failFunc) {
      this.httpBpmBase(paramObj, data => {
        if (!data.data || !data.data.data) {
          console.error('返回数据格式错误', data)
          failFunc && failFunc(data, '请求失败')
          return
        }
        succFunc && succFunc(data.data.data)
      }, failFunc)
    },
    // 于jquery封装的最基础的http请求，不限定于定向bpm固定格式的ajax请求，目前使用为帮助功能
    httpBase (paramObj, succFunc, failFunc) {
      // 参数校验
      if (!paramObj) {
        failFunc && failFunc('', 'paramObj can not be null')
        return
      }
      if (!paramObj.url) {
        failFunc && failFunc('', 'url can not be null')
        return
      }
      let async = false
      if (typeof paramObj.async !== 'undefined' && paramObj.async === true) {
        async = paramObj.async
      }
      let type = 'post'
      if (typeof paramObj.type !== 'undefined' && paramObj.type === true) {
        type = paramObj.type
      }
      let ajaxConf = {}
      // 如果是本地开发，那么使用bpmadmin进行认证,并且调用adapter
      // url必须是完整的，带host:.whchehm.com
      console.log('http request window.location.href->', window.location.href)
      if (window.location.href.indexOf('localhost:80') > -1) {
        let adapterUrl = adapterConf[envCurr].url
        // let bpmHost = bpmConf[envCurr].url
        console.log('请求地址：', paramObj.url)
        let adapterParam = {
          paramIn: '',
          url: paramObj.url
        }
        ajaxConf = {
          url: adapterUrl,
          header: {
            'Authorization': 'Basic YnBtYWRtaW46CWJwbWlzb2s=',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          async: async,
          type: type,
          data: adapterParam,
          success: function (data) {
            succFunc && succFunc(data)
          },
          error: function (data) {
            failFunc && failFunc(data, '请求失败')
          }
        }
      } else {
        ajaxConf = {
          url: paramObj.url,
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          async: async,
          type: type,
          data: '',
          success: function (data) {
            succFunc && succFunc(data)
          },
          error: function (data) {
            failFunc && failFunc(data, '请求失败')
          }
        }
      }
      if (paramObj && paramObj.timeout) {
        ajaxConf.timeout = paramObj.timeout
      }
      $.ajax(ajaxConf)
    },
    // 再次封装，用于bpmcore 引擎的请求，适用范围为引擎接口，不对外暴露
    httpBpmCore (paramObj, succFunc, failFunc, bizFailFunc) {
      this.httpBpm(paramObj, data => {
        console.log('lib core httpBpmFlow return JSON', data)
        let respMessage = this.$store.state.bpmcoreI18n.msgExecServiceError
        if (data.respCode && data.respMessage !== '') {
          respMessage = data.respMessage
        }
        // 异常码遍历
        if (data.respCode && data.respCode !== '200') {
          switch (data.respCode) {
            case '900000':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_900000)
              break
            case '900001':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_900001)
              break
            case '900002':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_900002)
              break
            case '900003':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_900003)
              break
            case '900004':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_900004)
              break
            case '900005':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_900005)
              break
            case '900006':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_900006)
              break
            case '910001':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910001)
              break
            case '910002':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910002)
              break
            case '910003':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910003)
              break
            case '910004':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910004)
              break
            case '910005':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910005)
              break
            case '910006':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910006)
              break
            case '910007':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910007)
              break
            case '910008':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910008)
              break
            case '910009':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910009)
              break
            case '910010':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910010)
              break
            case '910011':
              this.alert(respMessage)
              break
            case '910012':
              this.alert(respMessage)
              break
            case '910013':
              this.alert(respMessage)
              break
            case '910014':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_910014)
              break
            case '910015':
              this.alert(respMessage)
              break
            case '920001':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_920001)
              break
            case '920002':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_920002)
              break
            case '920003':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_920003)
              break
            case '920004':
              this.alert(respMessage)
              break
            case '920005':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_920005)
              break
            case '930001':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_930001)
              break
            case '930002':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_930002)
              break
            case '930003':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_930003)
              break
            case '930004':
              this.alert(respMessage)
              break
            case '930005':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_930005)
              break
            case '930006':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_930006)
              break
            case '940001':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_940001)
              break
            case '950001':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_950001)
              break
            case '9003':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_9003)
              break
            case '9004':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_9004)
              break
            case '9005':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_9005)
              break
            case '9006':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_9006)
              break
            case '9007':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_9007)
              break
            case '9008':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_9008)
              break
            case '9009':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_9009)
              break
            case '9010':
              this.alert(this.$store.state.bpmcoreI18n.RESP_ERROR_9010)
              break
            case '9011':
              this.alert(respMessage)
              break
            default:
              this.alert(this.$store.state.bpmcoreI18n.msgExecServiceError)
              break
          }
        }
        if (data.respCode && data.respCode !== '200') {
          bizFailFunc && bizFailFunc(data)
          return
        }
        succFunc && succFunc(data)
      }, data => {
        this.alert(this.$store.state.bpmcoreI18n.msgExecServiceError)
        failFunc && failFunc(data)
      })
    },


    /**
     * 获取bpm的表数据通用方法
     * @param paramObj{tsPiid,tableName,dictFields,begin_line,page_LineNbr}
     * @param succFunc
     * @param failFunc
     */
    httpBpmGetBz (paramObj, succFunc, failFunc) {
      let getKey = 'TS_ID' //default value is TS_ID
      if (paramObj && paramObj.keyField && paramObj.keyField !== null && paramObj.keyField !== ''
        && typeof paramObj.keyField !== 'undefined') {
        getKey = paramObj.keyField
      }

      let searchClause = {
        sql: ' ' + getKey + '=?',
        parameters: [paramObj.keyValue]
      }
      // let searchClause = {
      //   sql: ' TS_ID=?',
      //   parameters: [paramObj.tsId]
      // }
      this.httpBpm({
        inputParameter: JSON.stringify({
          'tableName': paramObj.tableName,
          'searchClause': JSON.stringify(searchClause),
          'dictFields': paramObj.dictFields,
          'begin_line': typeof paramObj.begin_line !== 'undefined' ? paramObj.begin_line : 0,
          'page_LineNbr': typeof paramObj.page_LineNbr !== 'undefined' ? paramObj.page_LineNbr : 10,
          'countFlag': typeof paramObj.countFlag !== 'undefined' ? paramObj.countFlag : 1
        }),
        async: paramObj.async,
        'apiName': 'EBVCA@AJAX_RetrieveProcessBzData'
      }, data => {
        if (data && data.returnCode === '000000') {
          let jsonResult = JSON.parse(data.jsonResult)
          console.log('EBVCA@AJAX_RetrieveProcessBzData table【' + paramObj.tableName + '】result', jsonResult)
          succFunc && succFunc(jsonResult, data.totalNbr)
        } else {
          failFunc && failFunc('', 'fail')
        }
      }, failFunc)
    },
    /**
     *
     * @param paramObj
     * @param succFunc
     * @param failFunc
     */
    httpBpmSaveBz (paramObj, succFunc, failFunc) {
      if (typeof paramObj.data.num && typeof paramObj.data.num !== 'undefined') {
        delete paramObj.data.num
      }
      this.httpBpm({
        inputParameter: JSON.stringify({
          // 'saveDataInputParameter': '',
          'tableName': paramObj.tableName,
          'keyFields': paramObj.keyFields,
          'saveFlag': typeof paramObj.saveFlag !== 'undefined' ? paramObj.saveFlag : '',
          'data': [paramObj.data]
        }),
        'apiName': 'EBVCA@AJAX_SaveProcessBzData'
      }, data => {
        if (data && data.returnCode === '000000') {
          succFunc && succFunc()
        } else {
          failFunc && failFunc('', 'fail')
        }
      }, failFunc)
    },
    /**
     * 获取bpm的表数据通用方法
     * @param paramObj{tsPiid,tableName,dictFields,begin_line,page_LineNbr}
     * @param succFunc
     * @param failFunc
     */
    httpBpmDelBz (paramObj, succFunc, failFunc) {
      var sqlStr = '?'
      for (var i = 1; i < paramObj.data.length; i++) {
        sqlStr += ',?'
      }
      let delKey = ''
      delKey = paramObj.keyFields[0]

      let sql = ' ' + delKey + ' in (' + sqlStr + ')'

      let delValues = []
      for (var j = 0; j < paramObj.data.length; j++ ) {
        delValues[j] =  paramObj.data[j][delKey]
      }
      var removeClause = {
        sql: sql,
        parameters: delValues
      }
      this.httpBpm({
        inputParameter: JSON.stringify({
          'tableName': paramObj.tableName,
          'removeClause': JSON.stringify(removeClause),
        }),
        'apiName': 'EBVCA@AJAX_RemoveProcessBizData'
      }, data => {
        if (data && data.returnCode === '000000') {
          // this.$store.state.returnCode = '0000000000' // 给业务状态置为成功标志。
          succFunc && succFunc()
        } else {
          failFunc && failFunc('', '业务失败')
        }
      }, failFunc)
    }
  }
}
export default mixins
