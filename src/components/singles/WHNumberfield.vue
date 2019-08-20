<template>
  <v-text-field v-bind="$attrs" v-on="$listeners" :inheritAttrs="false" type="number" />
</template>

<script>
  export default {
    name: 'wh-numberfield'
  }
</script>