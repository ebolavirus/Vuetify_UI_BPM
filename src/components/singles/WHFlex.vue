<template>
  <v-flex :class="flexClass" v-bind="$attrs" v-on="$listeners" :inheritAttrs="false">
    <slot />
  </v-flex>
</template>

<script>
  export default {
    name: 'wh-flex',
    props: {
      rowNumber: {
        type: Number,
        default: 1
      }
    },
    computed: {
      flexClass() {
        let resultJson = {
          'xs12': true,
          'px-1': true
        }
        let smTitle = 'sm12'
        switch (this.rowNumber) {
          case 1:
            smTitle = 'sm12';
            break;
          case 2:
            smTitle = 'sm6';
            break;
          case 3:
            smTitle = 'sm4';
            break;
          case 4:
            smTitle = 'sm3';
            break;
          default:
            smTitle = 'sm12';
            break;
        }
        resultJson[smTitle] = true;
        return resultJson;
      }
    }
  }
</script>