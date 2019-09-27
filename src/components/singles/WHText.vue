<template>
  <div class="v-input v-input--is-label-active v-text-field" :label="label">
    <div class="v-input__slot">
      <div class="v-text-field__slot">
        <label for="input-907" class="v-label v-label--active theme--light"
          style="left: 0px; right: auto; position: absolute;">{{label}}</label>
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
      label: '',
      value: ''
    }
  }
</script>