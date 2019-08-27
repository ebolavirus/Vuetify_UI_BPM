<template>
  <v-simple-table fixed-header :height="height" :dense="dense" v-if="$vuetify.breakpoint.smAndUp">
    <thead>
      <tr>
        <th v-for="(item, key) in headers" :key="key">
          {{item.text}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item2, key2) in items" :key="key2">
        <td v-for="(item3, key3) in headers" :key="key3">
          {{item2[item3.value]}}
        </td>
      </tr>
    </tbody>
  </v-simple-table>
  <div v-else>TODO::mobile table</div>
</template>

<script>
  export default {
    name: 'wh-table',
    data() {
      return {
        selectedIndex: -1
      }
    },
    props: {
      height: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '300px'
      },
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