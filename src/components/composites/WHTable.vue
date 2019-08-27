<template>

</template>

<script>
  export default {
    name: 'wh-table',
    data() {
      return {}
    },
    props: {
      headers: {
        // support ability: text,value,width,align,editable
        type: Array,
        default: []
      },
      items: {
        type: Array,
        default: []
      },
      showSelect: {
        type: Boolean,
        default: false
      },
      singleSelect: {
        type: Boolean,
        default: true
      }
    }
  }
</script>