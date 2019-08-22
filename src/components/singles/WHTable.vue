<template>
  <v-data-table v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-data-table>
</template>

<script>
  export default {
    name: 'wh-table'
  }
</script>