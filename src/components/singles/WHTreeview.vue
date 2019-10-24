<script>
  import {
    VTreeview
  } from 'vuetify/lib'
  export default {
    name: 'wh-treeview',
    extends: VTreeview,
    props: {
      activatable: {
        type: Boolean,
        default: true
      }
    }
  };
</script>