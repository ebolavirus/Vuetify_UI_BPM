<template>
  <v-text-field v-model="whpassvalue" v-bind="$attrs" :rules="passrules" v-on="$listeners" :inheritAttrs="false"
    @focus="focusAction" @blur="blurAction" />
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
        cacheValue: '',
        isFocusing: false,
        rulesTag: {
          ruleMoney: value => {
            const pattern = /^(\-|\+)?\d+(\.\d+)?$/
            return pattern.test(value) || 'Invalid Money.'
          }
        }
      }
    },
    computed: {
      whpassvalue: {
        get() { //回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          return this.isFocusing ? this.value : this.priceSwitch(this.value)
        },
        set(val) { //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          if (this.isFocusing) {
            this.cacheValue = val
          } else {
            this.cacheValue = val
            this.$emit('whvalueChanged', this.cacheValue)
          }
        }
      },
      passrules() {
        return this.rules.concat(this.isFocusing ? [this.rulesTag.ruleMoney] : []);
      }
    },
    methods: {
      priceSwitch(x) {
        //强制保留两位小数
        var e = parseFloat(x);
        if (isNaN(e)) return '0.00';
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length < (rs + 1) + 2) {
          s += '0';
        }
        //每三位用一个逗号隔开
        var leftNum = s.split(".")[0];
        var rightNum = "." + s.split(".")[1];
        var result;
        //定义数组记录截取后的价格
        var resultArray = new Array();
        if (leftNum.length > 3) {
          var i = true;
          while (i) {
            resultArray.push(leftNum.slice(-3));
            leftNum = leftNum.slice(0, leftNum.length - 3);
            if (leftNum.length < 4) {
              i = false;
            }
          }
          //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
          var sortArray = new Array();
          for (var j = resultArray.length - 1; j >= 0; j--) {
            sortArray.push(resultArray[j]);
          }
          result = leftNum + "," + sortArray.join(",") + rightNum;
        } else {
          result = s;
        }
        return result;
      },
      focusAction() {
        //console.log('focused.....', e)
        this.isFocusing = true
      },
      blurAction() {
        //console.log('blurred.....', e)
        this.isFocusing = false
        //console.log('before the cachevalue', this.cacheValue)
        var f = parseFloat(this.cacheValue);
        if (isNaN(f) || f === null) {
          f = 0;
        }
        // 保留两位小数
        f = Math.round(f * 100) / 100;
        this.cacheValue = f + ''
        //console.log('now the cachevalue', this.cacheValue)
        this.$emit('whvalueChanged', this.cacheValue)
      }
    }
  }
</script>