<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
  export default {
    name: 'wh-loading',
    props: {
      loading: {
        type: Boolean,
        default () {
          return false
        }
      }
    }
  };
</script>