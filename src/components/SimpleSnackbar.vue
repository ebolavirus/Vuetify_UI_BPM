<template>
  <v-snackbar v-model="shown" :color="color" :bottom="snackbarY === 'bottom'" :left="snackbarX === 'left'"
    :right="snackbarX === 'right'" :timeout="snackbarTimeout" :top="snackbarY === 'top'">
    {{ text }}
    <v-btn icon :ripple="false" @click="close()">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
  export default {
    name: "Snackbar",
    props: {
      snackbarX: String,
      snackbarY: String,
      color: String,
      snackbarTimeout: Number,
      text: String
    },
    data() {
      return {
        shown: true
      }
    },
    methods: {
      show() {
        this.shown = true;
        if (this.timeout) {
          setTimeout(() => this.$emit("close"), this.timeout + 300);
        }
      },
      close() {
        this.shown = false;
        setTimeout(() => this.$emit("close"), 500);
      }
    }
  }
</script>

<style scoped>

</style>