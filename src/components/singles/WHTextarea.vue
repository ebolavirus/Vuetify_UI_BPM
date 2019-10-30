<template>
  <v-textarea :auto-grow="disabled" :readonly="readonly" :disabled="disabled"  v-bind="$attrs" v-on="$listeners" :inheritAttrs="false" />
</template>

<script>
  export default {
    name: 'wh-textarea',
    props: {
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>