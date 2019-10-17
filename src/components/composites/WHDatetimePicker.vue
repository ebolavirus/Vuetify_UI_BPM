<template>
  <v-text-field v-if="readonly || disabled" v-model="whpassvalue" :label="label" append-icon="mdi-calendar-multiselect"
    :readonly="readonly" :disabled="disabled">
  </v-text-field>
  <span v-else>
    <v-text-field v-model="whpassvalue" :label="label" :rules="rules" append-icon="mdi-calendar-multiselect" readonly
      @click.stop="openDate()" />
    <v-dialog v-model="modal" persistent width="290px">
      <v-date-picker v-model="dateValue" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal=false">取消</v-btn>
        <v-btn text color="primary" @click="openTime()">确定</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="modal2" persistent width="260px">
      <v-time-picker v-model="timeValue" scrollable width="260px">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal2 = false">取消</v-btn>
        <v-btn text color="primary" @click="saveTime()">确定</v-btn>
      </v-time-picker>
    </v-dialog>
  </span>
</template>
<script>
  export default {
    name: 'wh-datetime-picker',
    model: {
      prop: 'datetime',
      event: 'whdateChanged'
    },
    data: () => ({
      menu: false,
      modal: false,
      modal2: false,
      dateValue: '2019-10-15',
      timeValue: '09:22:00'
    }),
    props: {
      datetime: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      rules: {
        type: Array,
        default () {
          return []
        }
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      whpassvalue: {
        get() { //回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          return this.datetime
        },
        set(val) { //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          this.$emit('whdateChanged', val)
        }
      }
    },
    methods: {
      openDate() {
        this.modal = true
        this.dateValue = this.datetime.substr(0,10)
        this.timeValue = this.datetime.substr(11,8)
      },
      openTime() {
        this.modal=false
        this.modal2 = true
      },
      saveTime() {
        let wholeTime = this.dateValue + ' ' + this.timeValue
        if (wholeTime.length <= 16) {
          //maybe seconds is missed
          wholeTime += ":00"
        }
        this.whpassvalue = wholeTime
        this.modal2 = false
      }
    }
  }
</script>