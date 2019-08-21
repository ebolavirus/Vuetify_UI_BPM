<template>
  <v-container>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-logo</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-logo></wh-logo><br>
          <code>&lt;wh-logo&gt;&lt;/wh-logo&gt;</code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-icon</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-icon color="primary">mdi-car-light-fog</wh-icon>
          <br><code>&lt;wh-icon&gt;mdi-car-light-fog&lt;/wh-icon&gt;</code>
          <br>详见http://materialdesignicons.com/
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-textfield</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-textfield label="*办公室位置" placeholder="万华实业前楼" disabled append-icon="mdi-account-edit" />
          <code>&lt;wh-textfield label="*办公室位置" placeholder="万华实业前楼" disabled
            append-icon="mdi-account-edit"/&gt;</code>
          <br>参考v-text-field，属性一致
        </v-expansion-panel-content>
        <!-- IT顾问评估 -->
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-numberfield</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-numberfield v-model="valuenumber" label="办公室个数" placeholder="please input number" append-icon="mdi-bee" />
          <code>&lt;wh-textfield label="*办公室位置" placeholder="万华实业前楼" disabled
            append-icon="mdi-account-edit"/&gt;</code>
          <br>整体基于v-text-field,最大长度、后缀图标等属性参考v-text-field
          <br>整体基于v-text-field,最大长度、后缀图标等属性参考v-text-field
          <br>注意，要触发此组件的值变化，必须使用v-model进行值绑定，否则可以直接用value赋值
        </v-expansion-panel-content>
        <!-- IT顾问评估 -->
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-moneyfield</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-moneyfield label="办公室价格" placeholder="please input number" append-icon="mdi-bee" />
          <code>&lt;wh-textfield label="*办公室位置" placeholder="万华实业前楼" disabled
            append-icon="mdi-account-edit"/&gt;</code>
          <br>参考v-text-field，属性一致
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
      panel: [],
      valuenumber: '0'
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