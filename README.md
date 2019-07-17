# 描述

vue流程页面开发需要引用的bpm-core-item组件，用于流程流转。

## 组件安装

	npm install bpm-core-item

## 组件版本更新

更新至最新版本：

	npm install bpm-core-item@*

如需更新至指定版本：

	npm install bpm-core-item@0.0.1

通常情况下bpmcore都使用最新版本。

## 引用

	import bpmCoreItem from 'bpm-core-item'
	Vue.use(bpmCoreItem)

## 使用

bpm-core-item包含两个组件，页面布局组件和附件组件。

1.页面布局组件：

	  <bpmprocesslayout>
	  </bpmprocesslayout>

2.附件组件：

	  <attachment>
	  </attachment>

## bpmprocesslayout配置

### Props说明


|    参数    |    作用   |   类型   | 默认值 |
| -----------------  | ---------------- | :--------: | :----------: |
| title        |流程标题名称 |String | 非空，必须指定流程名称

### 事件说明

| 方法 | 描述   |  触发时机
| :--------:   | -----  | -----  |
|    save    | 保存事件，用于保存业务数据 | 点击保存按钮时调用
|    submitVerify    |  提交校验事件  |    点击提交时调用
|    confirmVerify    |  提交确认校验事件  |   点击提交-确认按钮后调用
|    rejectVerify    |  驳回校验事件   |  点击驳回按钮时调用
|    rejectConfirmVerify    |  驳回确认校验事件   |  点击驳回-确认按钮时调用
|    reassignVerify    |  加签、转办校验事件   |  点击加签转办选人框的确认按钮后调用
|    cancelVerify    |  注销校验时间   | 点击注销按钮汇后调用

以上校验事件校验通过后才能继续往下执行引擎流转。

引用bpmprocesslayout的组件需要在methods添加校验方法

	// 点击保存按钮触发的方法
    save () {
      // todo 业务数据保存
    },
	// 提交校验
    submitVerify () {
      this.setBpmValue({akey: 'isSubmitVerify', avalue: false})
	  // todo 业务校验
      this.setBpmValue({akey: 'isSubmitVerify', avalue: true})
    },
    // 点击提交弹框中的确认按钮出发的方法
    confirmVerify () {
      this.setBpmValue({akey: 'isConfirmVerify', avalue: false})
      // todo 业务校验
      this.setBpmValue({akey: 'isConfirmVerify', avalue: true})
    },
    // 点击驳回按钮触发的方法
    rejectVerify () {
     this.setBpmValue({akey: 'isRejectVerify', avalue: false})
      // todo 业务校验
     this.setBpmValue({akey: 'isRejectVerify', avalue: true})
    },
    // 点击驳回弹框中的确认按钮触发的方法
    rejectConfirmVerify () {
      this.setBpmValue({akey: 'isRejectConfirmVerify', avalue: false})
      // todo 业务校验
      this.setBpmValue({akey: 'isRejectConfirmVerify', avalue: true})
    },
    // 点击加签按转办选人组件的确认钮触发的方法
    reassignVerify () {
      this.setBpmValue({akey: 'isReassignVerify', avalue: false})
      // todo 业务校验
      this.setBpmValue({akey: 'isReassignVerify', avalue: true})
    }
    // 点击注销钮触发的方法
    cancelVerify () {
      this.setBpmValue({akey: 'isCancelVerify', avalue: false})
      // todo 业务校验
      this.setBpmValue({akey: 'isCancelVerify', avalue: true})
    }


### 主表单实现

主表单实现：在bpmprocesslayout组件中添加slot=main的template：

        <template slot="main">
        <！--todo 主表单实现-->
       </template>

### bpmprocesslayout配置样例

     <bpmprocesslayout :title="$t('mtv3I18n.bpdName')
        @submitVerify="submitVerify"
         @confirmVerify="confirmVerify"
         @rejectVerify="rejectVerify"
         @reassignVerify="reassignVerify">
        <template slot="main">
        <！--todo 主表单实现-->
       </template>
    </bpmprocesslayout>


## attachment配置

### Props说明


|    参数    |    作用   |   类型   | 默认值 |
| -----------------  | ---------------- | :--------: | :----------: |
| instanceId        |附件绑定值 |String | 非空，必须指定，只包含一个附件时为流程tspiid

###特殊说明

一个流程最多支持三个附件组件，第二个、第三个组件分别为tspiid+'att'、tspiid+'app'。
