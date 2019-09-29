<template>
  <v-dialog v-model="shown" :max-width="message.dialogMaxWidth || 300" persistent>
    <v-card>
      <v-responsive>
        <v-card-title class="title" v-if="message.title">
          {{ message.title }}
        </v-card-title>
        <v-card-text>
          <span style="font-size: 16px;">{{ message.text }}</span>
          <v-text-field ref="prompt" v-if="type === 'prompt'" :type="message.type || 'text'" v-model="user_input"
            @keydown="checkSubmit"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn v-on:click="cancel" v-if="type !== 'alert'">{{ message.cancelText }}</v-btn>
          <v-btn v-on:click="accept" color="primary">{{ message.acceptText }}</v-btn>
        </v-card-actions>
      </v-responsive>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "SimpleDialog",
    props: {
      type: String,
      message: Object,
      resolve: Function
    },
    data() {
      return {
        shown: false,
        user_input: ""
      }
    },
    methods: {
      cancel() {
        this.shown = false;
        this.resolve(false);
      },
      accept() {
        this.shown = false;
        this.resolve(this.type === "prompt" ? this.user_input : true);
      },
      checkSubmit(evt) {
        if (evt.key === "Enter") {
          this.accept();
        }
      }
    },
    beforeMount() {
      this.theme = this.message.theme || {};
      this.breakpoint = {};
    },
    mounted() {
      this.shown = true;
      if (this.type === "prompt") {
        setTimeout(function () {
          this.$refs.prompt.focus();
        }.bind(this), 300);
      }
    }
  }
</script>

<style scoped>

</style>