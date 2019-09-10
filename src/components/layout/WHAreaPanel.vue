<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title font-weight-bold">{{title}}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <slot />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default {
    name: "wh-area-panel",
    props: {
      title: {
        type: String,
        default: ""
      }
    }
  };
</script>