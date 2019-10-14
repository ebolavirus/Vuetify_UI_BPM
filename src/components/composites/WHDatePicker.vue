<template>
  <v-text-field v-if="readonly || disabled" v-model="whpassvalue" :label="label" append-icon="mdi-calendar-multiselect"
    :readonly="readonly" :disabled="disabled">
  </v-text-field>
  <v-dialog v-else ref="datepickerdialog" v-model="modal" :return-value.sync="whpassvalue" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field v-model="whpassvalue" :label="label" :rules="rules" append-icon="mdi-calendar-multiselect" readonly v-on="on">
      </v-text-field>
    </template>
    <v-date-picker v-model="whpassvalue" scrollable>
      <div class="flex-grow-1"></div>
      <v-btn text color="primary" @click="modal = false">取消</v-btn>
      <v-btn text color="primary" @click="$refs.datepickerdialog.save(whpassvalue)">确定</v-btn>
    </v-date-picker>
  </v-dialog>
</template>
<script>
  export default {
    name: 'wh-date-picker',
    model: {
      prop: 'date',
      event: 'whdateChanged'
    },
    data: () => ({
      menu: false,
      modal: false
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
    }
  }
</script>