<template>
  <v-data-table v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-data-table>
</template>

<script>
  export default {
    name: 'wh-table',
    updated() {
      console.log('bbbbbbb', this.$slots);
    }
  }
</script>