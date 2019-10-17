<template>
  <v-text-field v-if="readonly || disabled" v-model="whpassvalue" :label="label" append-icon="mdi-calendar-multiselect"
    :readonly="readonly" :disabled="disabled">
  </v-text-field>
  <div v-else>
    <v-text-field v-model="whpassvalue" :label="label" :rules="rules" append-icon="mdi-calendar-multiselect" readonly
      @click.stop="modal=true" />
    <v-dialog ref="datepickerdialog" v-model="modal" :return-value.sync="whpassvalue" persistent width="290px">
      <v-date-picker v-model="whpassvalue" scrollable>
        <div class="flex-grow-1"></div>
        <v-btn text color="primary" @click="modal=false">取消1</v-btn>
        <v-btn text color="primary" @click="openTime()">确定1</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog ref="timepickerdialog" v-model="modal2" :return-value.sync="whpassvalue" persistent width="260px">
      <v-time-picker v-model="whpassvalue" scrollable width="260px">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false">取消2</v-btn>
        <v-btn text color="primary" @click="$refs.timepickerdialog.save(whpassvalue)">确定2</v-btn>
      </v-time-picker>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    name: 'wh-datetime-picker',
    model: {
      prop: 'date',
      event: 'whdateChanged'
    },
    data: () => ({
      menu: false,
      modal: false,
      modal2: false
    }),
    props: {
      date: {
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
          return this.date
        },
        set(val) { //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          this.$emit('whdateChanged', val)
        }
      }
    },
    methods: {
      openTime() {
        this.$refs.datepickerdialog.save(this.whpassvalue);
        this.modal2 = true
      }
    }
  }
</script>