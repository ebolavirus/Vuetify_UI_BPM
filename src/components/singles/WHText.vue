<template>
  <div class="v-input v-input--is-label-active v-text-field" :label="label">
    <div class="v-input__slot" style="margin-bottom: 13px">
      <div class="v-text-field__slot">
        <label for="input-907" class="v-label v-label--active theme--light whtexttitle">{{label}}</label>
        <!-- <input id="input-907" type="text"> -->
        <div class="whtextbreak">
          {{value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wh-text',
    model: {
      prop: 'value',
      event: 'valueChanged'
    },
    props: {
      label: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      }
    }
  }
</script>