<template>
  <v-text-field v-model="whpassvalue" v-bind="$attrs" :rules="passrules" v-on="$listeners" :inheritAttrs="false" />
</template>

<script>
  export default {
    name: 'wh-moneyfield',
    model: {
      prop: 'value',
      event: 'whvalueChanged'
    },
    props: {
      value: {
        type: String,
        default () {
          return ''
        }
      },
      rules: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        rulesTag: {
          ruleMoney: value => {
            const pattern = /^(\-)?\d+(\.\d{1,2})?$/
            return pattern.test(value) || 'Invalid Money.'
          }
        }
      }
    },
    // watch: {
    //   whpassvalue(to, from) {
    //     console.log('changed....', to, from, this.isDecimal)
    //   }
    // },
    computed: {
      whpassvalue: {
        get() { //回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          return this.value
        },
        set(val) { //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          this.$emit('whvalueChanged', val)
        }
      },
      passrules() {
        return this.rules.concat([this.rulesTag.ruleMoney]);
      }
    }
  }
</script>