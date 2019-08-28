<template>
  <dialog-promise-demo></dialog-promise-demo>
</template>

<script>
import DialogPromiseDemo from './demo/DialogPromiseDemo.vue'

export default {
  name: 'App',
  components: {
      "dialog-promise-demo" : DialogPromiseDemo
  },
  data () {
    return {
      //
    }
  }
}
</script>
