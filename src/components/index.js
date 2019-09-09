import Vue from 'vue'
import WHLogo from './singles/WHLogo'
import WHMenu from './singles/WHMenu'
import WHIcon from './singles/WHIcon'
import WHImg from './singles/WHImg'
import WHHyperlink from './singles/WHHyperlink'
import WHText from './singles/WHText'
import WHTextfield from './singles/WHTextfield'
import WHNumberfield from './singles/WHNumberfield'
import WHMoneyfield from './singles/WHMoneyfield'
import WHTextarea from './singles/WHTextarea'
import WHButton from './singles/WHButton'
import WHSelect from './singles/WHSelect'
import WHRadioGroup from './singles/WHRadioGroup'
import WHRadio from './singles/WHRadio'
import WHCheckbox from './singles/WHCheckbox'
import WHTreeview from './singles/WHTreeview'
import WHTimeline from './singles/WHTimeline'
import WHTimelineItem from './singles/WHTimelineItem'
import WHTab from './singles/WHTab'
import WHTabItem from './singles/WHTabItem'
import WHTabsItems from './singles/WHTabsItems'
import WHTabs from './singles/WHTabs'
import WHTabsSlider from './singles/WHTabsSlider'

import WHDatePicker from './composites/WHDatePicker'
import WHTimePicker from './composites/WHTimePicker'
import WHPagination from './composites/WHPagination'
import WHTable from './composites/WHTable'
import WHEditdialog from './composites/WHEditdialog'
import WHLoading from './composites/WHLoading'

import WHApp from './layout/WHApp'
import WHContent from './layout/WHContent'
import WHContainer from './layout/WHContainer'
import WHCard from './layout/WHCard'
import WHCardText from './layout/WHCardText'
import WHCardTitle from './layout/WHCardTitle'
import WHCardActions from './layout/WHCardActions'
import WHDialog from './layout/WHDialog'
import WHDrawer from './layout/WHDrawer'
import WHFooter from './layout/WHFooter'
import WHTopbar from './layout/WHTopbar'
import WHLayout from './layout/WHLayout'
import WHListItem from './layout/WHListItem'
import WHList from './layout/WHList'
import WHListItemTitle from './layout/WHListItemTitle'
import WHSpacer from './layout/WHSpacer'
import WHFlex from './layout/WHFlex'
import WHAreaPanel from './layout/WHAreaPanel'
import WHAreaPanels from './layout/WHAreaPanels'
import SimpleDialog from './SimpleDialog'
import SimpleSnackbar from './SimpleSnackbar'

import DialogPromise from './DialogPromise'
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

import vuetify from '../plugins/vuetify'


import '@mdi/font/css/materialdesignicons.css'


SimpleDialog.install = function (Vue) {
    Vue.component(SimpleDialog.name, SimpleDialog)
}
SimpleSnackbar.install = function (Vue) {
    Vue.component(SimpleSnackbar.name, SimpleSnackbar)
}

WHLogo.install = function (Vue) {
    Vue.component(WHLogo.name, WHLogo)
}

WHMenu.install = function (Vue) {
    Vue.component(WHMenu.name, WHMenu)
}
WHIcon.install = function (Vue) {
    Vue.component(WHIcon.name, WHIcon)
}
WHImg.install = function (Vue) {
    Vue.component(WHImg.name, WHImg)
}
WHHyperlink.install = function (Vue) {
    Vue.component(WHHyperlink.name, WHHyperlink)
}
WHText.install = function (Vue) {
    Vue.component(WHText.name, WHText)
}
WHTextfield.install = function (Vue) {
    Vue.component(WHTextfield.name, WHTextfield)
}
WHNumberfield.install = function (Vue) {
    Vue.component(WHNumberfield.name, WHNumberfield)
}
WHMoneyfield.install = function (Vue) {
    Vue.component(WHMoneyfield.name, WHMoneyfield)
}
WHTextarea.install = function (Vue) {
    Vue.component(WHTextarea.name, WHTextarea)
}
WHButton.install = function (Vue) {
    Vue.component(WHButton.name, WHButton)
}
WHSelect.install = function (Vue) {
    Vue.component(WHSelect.name, WHSelect)
}
WHRadioGroup.install = function (Vue) {
    Vue.component(WHRadioGroup.name, WHRadioGroup)
}
WHRadio.install = function (Vue) {
    Vue.component(WHRadio.name, WHRadio)
}
WHCheckbox.install = function (Vue) {
    Vue.component(WHCheckbox.name, WHCheckbox)
}
WHTreeview.install = function (Vue) {
    Vue.component(WHTreeview.name, WHTreeview)
}
WHTimeline.install = function (Vue) {
    Vue.component(WHTimeline.name, WHTimeline)
}
WHTimelineItem.install = function (Vue) {
    Vue.component(WHTimelineItem.name, WHTimelineItem)
}


WHTab.install = function (Vue) {
    Vue.component(WHTab.name, WHTab)
}
WHTabsItems.install = function (Vue) {
    Vue.component(WHTabsItems.name, WHTabsItems)
}
WHTabItem.install = function (Vue) {
    Vue.component(WHTabItem.name, WHTabItem)
}
WHTabs.install = function (Vue) {
    Vue.component(WHTabs.name, WHTabs)
}
WHTabsSlider.install = function (Vue) {
    Vue.component(WHTabsSlider.name, WHTabsSlider)
}
WHDatePicker.install = function (Vue) {
    Vue.component(WHDatePicker.name, WHDatePicker)
}
WHTimePicker.install = function (Vue) {
    Vue.component(WHTimePicker.name, WHTimePicker)
}
WHTable.install = function (Vue) {
    Vue.component(WHTable.name, WHTable)
}
WHEditdialog.install = function (Vue) {
    Vue.component(WHEditdialog.name, WHEditdialog)
}
WHPagination.install = function (Vue) {
    Vue.component(WHPagination.name, WHPagination)
}
WHLoading.install = function (Vue) {
    Vue.component(WHLoading.name, WHLoading)
}



WHApp.install = function (Vue) {
    Vue.component(WHApp.name, WHApp)
}
WHContent.install = function (Vue) {
    Vue.component(WHContent.name, WHContent)
}
WHContainer.install = function (Vue) {
    Vue.component(WHContainer.name, WHContainer)
}
WHCard.install = function (Vue) {
    Vue.component(WHCard.name, WHCard)
}
WHCardText.install = function (Vue) {
    Vue.component(WHCardText.name, WHCardText)
}
WHCardTitle.install = function (Vue) {
    Vue.component(WHCardTitle.name, WHCardTitle)
}
WHCardActions.install = function (Vue) {
    Vue.component(WHCardActions.name, WHCardActions)
}
WHDialog.install = function (Vue) {
    Vue.component(WHDialog.name, WHDialog)
}
WHDrawer.install = function (Vue) {
    Vue.component(WHDrawer.name, WHDrawer)
}
WHFooter.install = function (Vue) {
    Vue.component(WHFooter.name, WHFooter)
}
WHTopbar.install = function (Vue) {
    Vue.component(WHTopbar.name, WHTopbar)
}
WHLayout.install = function (Vue) {
    Vue.component(WHLayout.name, WHLayout)
}
WHListItem.install = function (Vue) {
    Vue.component(WHListItem.name, WHListItem)
}
WHListItemTitle.install = function (Vue) {
    Vue.component(WHListItemTitle.name, WHListItemTitle)
}
WHList.install = function (Vue) {
    Vue.component(WHList.name, WHList)
}
WHSpacer.install = function (Vue) {
    Vue.component(WHSpacer.name, WHSpacer)
}
WHFlex.install = function (Vue) {
    Vue.component(WHFlex.name, WHFlex)
}
WHAreaPanel.install = function (Vue) {
    Vue.component(WHAreaPanel.name, WHAreaPanel)
}
WHAreaPanels.install = function (Vue) {
    Vue.component(WHAreaPanels.name, WHAreaPanels)
}



// 存储组件列表
const components = [WHLogo, WHMenu, WHIcon, WHImg, WHHyperlink, WHText, WHTextfield, WHNumberfield, WHMoneyfield, WHButton, WHSelect, WHRadioGroup, WHRadio, WHCheckbox, WHTreeview, WHTimeline,
    WHTimelineItem, WHTab, WHTabItem, WHTabsItems, WHTabsSlider, WHTimePicker, WHPagination, WHTable, WHLoading, WHApp, WHContent, WHContainer, WHCard, WHCardText,
    WHCardTitle, WHCardActions, WHDialog, WHDrawer, WHFooter, WHTopbar, WHLayout, WHList, WHListItem, WHListItemTitle, WHSpacer, WHFlex, WHAreaPanel, WHAreaPanels
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    // 遍历注册全局组件
    components.map(component => Vue.component(component.name, component))
    Vue.use(vuetify)
    Vue.use(DialogPromise)
    Vue.use(VuetifyDialog, {
        context: {
            vuetify
        }
    })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    // 以下是具体的组件列表
    WHLogo,
    WHMenu,
    WHIcon,
    WHImg,
    WHHyperlink,
    WHText,
    WHTextfield,
    WHNumberfield,
    WHMoneyfield,
    WHButton,
    WHSelect,
    WHRadioGroup,
    WHRadio,
    WHCheckbox,
    WHTreeview,
    WHTimeline,
    WHTimelineItem,
    WHTab,
    WHTabItem,
    WHTabsItems,
    WHTabsSlider,
    WHTimePicker,
    WHPagination,
    WHTable,
    WHLoading,
    WHApp,
    WHContent,
    WHContainer,
    WHCardText,
    WHCardTitle,
    WHCardActions,
    WHDialog,
    WHDrawer,
    WHFooter,
    WHTopbar,
    WHLayout,
    WHSpacer,
    WHListItemTitle,
    WHListItem,
    WHList,
    WHFlex,
    WHAreaPanel,
    WHAreaPanels,
    DialogPromise
}