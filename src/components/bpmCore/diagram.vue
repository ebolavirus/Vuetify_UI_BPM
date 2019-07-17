<template>
  <div>
      <iframe id="diagramIframe" :src="showDiagramUrl" style="height:70vh;background: #e1e1e1;width:100%;border:none"/>
</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'diagram',
  data () {
    return {
      isDialogVisible: false
    }
  },
  computed: {
    ...mapState(['showDiagramUrl'])
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
