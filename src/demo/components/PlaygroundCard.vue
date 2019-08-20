<template>
  <v-container>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          wh-logo
          <template v-slot:actions>
            <v-icon color="primary">$vuetify.icons.expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-logo></wh-logo>
          <code>&lt;wh-logo&gt;&lt;/wh-logo&gt;</code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          wh-icon
          <template v-slot:actions>
            <v-icon color="primary">$vuetify.icons.expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-icon color="primary">mdi-car-light-fog</wh-icon>
          <code>&lt;wh-icon&gt;mdi-car-light-fog&lt;/wh-icon&gt;</code>
          详见http://materialdesignicons.com/
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Textfield
          <template v-slot:actions>
            <v-icon color="primary">$vuetify.icons.expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-layout wrap>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field label="*办公室位置"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea label="服务内容"></v-textarea>
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
        <!-- IT顾问评估 -->
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
  export default {
    name: "PlaygroundCard",
    data: () => ({
      panel: []
    }),
    methods: {
      tryPlain() {
        this.$prompt("What is your favourite colour?").then(colour => {
          this.$inform("The colour is " + colour + ".");
        });
      },
      tryFull() {
        console.log(this.$vuetify)
        return
        this.$prompt({
          title: "Important question:",
          text: "What is your favourite colour?",
          dialogMaxWidth: 600,
          acceptText: "This",
          cancelText: "Won't say"
        }).then(color => {
          this.$warn({
            color: color,
            text: "The color is " + color + ".",
            closeText: "Yeah!",
            snackbarTimeout: 0
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>