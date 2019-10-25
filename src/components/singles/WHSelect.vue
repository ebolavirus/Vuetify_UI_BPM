<template>
  <v-select v-bind="$attrs" v-on="$listeners" :inheritAttrs="false" />
  <!-- <select name="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="fiat">Fiat</option>
    <option value="audi">Audi</option>
  </select> -->
</template>

<script>
  export default {
    name: 'wh-select',
    props: {},
    methods: {
      currentExplorer() {
        var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf('Opera') > -1
        // 判断是否Opera浏览器
        if (isOpera) {
          return 'opera'
        }
        // 判断是否Firefox浏览器
        if (userAgent.indexOf('Firefox') > -1) {
          return 'ff'
        }
        // 判断是否chorme浏览器
        if (userAgent.indexOf('Chrome') > -1) {
          return 'chrome'
        }
        // 判断是否Safari浏览器
        if (userAgent.indexOf('Safari') > -1) {
          return 'safari'
        }
        // 判断是否IE浏览器
        if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
          return 'ie'
        }
        // 判断是否Edge浏览器
        if (userAgent.indexOf('Trident') > -1) {
          return 'edge'
        }
        return ''
      }
    }/*,
    mounted() {
      let explorer = this.currentExplorer()
      // if (explorer === 'edge' || explorer === 'ie') {
        //do sometihing.....
      // }
      console.log('now ieexplorer--->', explorer) 
    }*/
  }
/*
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
      isDecimal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rulesTag: {
          ruleint: value => {
            const pattern = /^[0-9]*$/
            return pattern.test(value) || 'Invalid Integer.'
          },
          rulefloat: value => {
            const pattern = /^(-|\+)?\d+(\.\d+)?$/
            return pattern.test(value) || 'Invalid Decimal.'
          }
        }
      }
    },
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
  
*/
</script>