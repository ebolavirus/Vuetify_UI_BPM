<template>
  <v-text-field v-if="readonly || disabled" v-model="whpassvalue" :label="label" append-icon="mdi-calendar-multiselect"
    :readonly="readonly" :disabled="disabled">
  </v-text-field>
  <v-dialog v-else ref="timepickerdialog" v-model="modal" :return-value.sync="whpassvalue" persistent width="260px">
    <template v-slot:activator="{ on }">
      <v-text-field v-model="whpassvalue" :label="label" append-icon="mdi-clock-check-outline" readonly v-on="on">
      </v-text-field>
    </template>
    <v-time-picker v-model="whpassvalue" scrollable width="260px">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">取消</v-btn>
      <v-btn text color="primary" @click="$refs.timepickerdialog.save(whpassvalue)">确定</v-btn>
    </v-time-picker>
  </v-dialog>
</template>
<script>
  export default {
    name: 'wh-time-picker',
    model: {
      prop: 'time',
      event: 'whtimeChanged'
    },
    data: () => ({
      menu: false,
      modal: false
    }),
    props: {
      time: '',
      label: '',
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
          return this.time
        },
        set(val) { //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          this.$emit('whtimeChanged', val)
        }
      }
    }
  }
</script>