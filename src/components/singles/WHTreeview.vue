<script>
  import {
    VTreeview
  } from 'vuetify/lib'
  export default {
    name: 'wh-treeview',
    extends: VTreeview,
    props: {
      // selectable: {
      //   type: Boolean,
      //   default: true
      // },
      activatable: {
        type: Boolean,
        default: true
      }
    }
  };
</script>