<template>
  <v-layout wrap v-bind="$attrs" v-on="$listeners" :inheritAttrs="false">
    <slot />
  </v-layout>
</template>

<script>
  export default {
    name: 'wh-layout'
  }
</script>