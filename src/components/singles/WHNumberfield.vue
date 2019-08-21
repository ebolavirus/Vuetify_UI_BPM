<template>
  <v-text-field v-model="whpassvalue" v-bind="$attrs" :rules="passrules" v-on="$listeners" :inheritAttrs="false"
    type="number" />
</template>

<script>
  export default {
    name: 'wh-numberfield',
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
      },
      isDecimal: false
    },
    data() {
      return {
        rulesTag: {
          ruleint: value => {
            const pattern = /^[0-9]*$/
            return pattern.test(value) || 'Invalid Integer.'
          },
          //rulenull: value => !!value || 'Required.',
          //rulemax20: value => value.length <= 20 || 'Max 20 characters',
          rulefloat: value => {
            const pattern = /^(\-|\+)?\d+(\.\d+)?$/
            return pattern.test(value) || 'Invalid Decimal.'
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
        let numberrule = this.isDecimal ? [this.rulesTag.rulefloat] : [this.rulesTag.ruleint]
        return this.rules.concat(numberrule);
      }
    }
  }
</script>