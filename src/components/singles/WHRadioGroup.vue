<template>
  <div class="v-input v-input--is-label-active v-text-field" :label="label">
    <div class="v-input__slot">
      <div class="v-text-field__slot">
        <label for="input-907" class="v-label v-label--active theme--light whtexttitle">{{label}}</label>
        <v-radio-group v-model="whpassvalue" :row="$vuetify.breakpoint.smAndUp" v-bind="$attrs" v-on="$listeners"
          :inheritAttrs="false">
          <slot />
        </v-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wh-radio-group',
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
      label: {
        type: String,
        default () {
          return ''
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
      }
    }
  }
</script>