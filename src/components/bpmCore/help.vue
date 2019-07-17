<template>
  <div>
      <iframe id="helpIframe" :src="showHelpUrl" style="height:70vh;background: white;width:100%;border:none"/>
  </div>
  <!--#e1e1e1-->
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'help',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['showHelpUrl'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
