<template>
  <v-text-field :append-icon="(readonly || disabled) ? '':'mdi-square-edit-outline'" :readonly="readonly" :disabled="disabled"  v-bind="$attrs" v-on="$listeners" :inheritAttrs="false" />
</template>

<script>
  export default {
    name: 'wh-textfield',
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