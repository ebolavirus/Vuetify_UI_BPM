<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="whpassvalue" persistent full-width width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field v-model="whpassvalue" :label="label" append-icon="mdi-event" readonly v-on="on">
      </v-text-field>
    </template>
    <v-time-picker v-model="whpassvalue" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(whpassvalue)">OK</v-btn>
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
      label: ''
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