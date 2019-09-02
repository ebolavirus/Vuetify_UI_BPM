<template>
  <!-- <dialog-promise-demo></dialog-promise-demo> -->
  <it-service-demo></it-service-demo>
</template>

<script>
  import DialogPromiseDemo from './demo/DialogPromiseDemo.vue'
  import ItServiceDemo from './demo/ITServiceDemo.vue'

  export default {
    name: 'App',
    components: {
      "dialog-promise-demo": DialogPromiseDemo,
      "it-service-demo": ItServiceDemo
    },
    data() {
      return {
        //
      }
    }
  }
</script>