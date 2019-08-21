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
          <wh-numberfield label="办公室个数" placeholder="please input number" append-icon="mdi-bee" />
          <code>&lt;wh-textfield label="*办公室位置" placeholder="万华实业前楼" disabled
            append-icon="mdi-account-edit"/&gt;</code>
          <br>参考v-text-field，属性一致
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
      <v-expansion-panel>
        <v-expansion-panel-header>wh-textarea</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-textarea label="评估意见" light placeholder="请填写评估意见" value=""></wh-textarea>
          <br><code>&lt;wh-textarea label="评估意见" light placeholder="请填写评估意见" value=""&gt;</code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-btn</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-btn block color="indigo" dark>Button</wh-btn>
          <br><code>&lt;wh-btn block color="indigo" dark&gt;Button&lt;/wh-btn&gt;</code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-select</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-select :items="types" label="state" item-text="state"
          item-value="abbr"></wh-select>
          <br><code>&lt;wh-select :items="types" label="state" item-text="state"
          item-value="abbr"&gt;&lt;/wh-select&gt;</code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-radio</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-radio-group row label="性别：">
              <wh-radio label="男" value="radio-1"></wh-radio>
              <wh-radio label="女" value="radio-2"></wh-radio>
          </wh-radio-group>          
          <br><code>          &lt;wh-radio-group row&gt;
              &lt;wh-radio label="男" value="radio-1"&gt;&lt;/wh-radio&gt;
              &lt;wh-radio label="女" value="radio-2"&gt;&lt;/wh-radio&gt;
          &lt;/wh-radio-group&gt;  </code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-checkbox</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-radio-group row label="办理人：">
              <wh-checkbox label="张三" value="checkbox-1"></wh-checkbox>
              <wh-checkbox label="李四" value="checkbox-2"></wh-checkbox>
          </wh-radio-group>          
          <br><code>          &lt;wh-radio-group row&gt;
              &lt;wh-checkbox label="张三" value="checkbox-1"&gt;&lt;/wh-checkbox&gt;
              &lt;wh-checkbox label="李四" value="checkbox-2"&gt;&lt;/wh-checkbox&gt;
          &lt;/wh-radio-group&gt;  </code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-timeline</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-timeline>
            <wh-timeline-item>timeline item</wh-timeline-item>
            <wh-timeline-item class="text-right">timeline item</wh-timeline-item>
            <wh-timeline-item>timeline item</wh-timeline-item>
          </wh-timeline>          
          <br><code>        &lt;wh-timeline&gt;
                    &lt;wh-timeline-item&gt;timeline item&lt;/wh-timeline-item&gt;
                    &lt;wh-timeline-item class="text-right"&gt;timeline item&lt;/wh-timeline-item&gt;
                    &lt;wh-timeline-item&gt;timeline item&lt;/wh-timeline-item&gt;
            &lt;/wh-timeline&gt;</code>
        </v-expansion-panel-content>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-tabbar</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-tabs>
            <wh-tab>Item One</wh-tab>
            <wh-tab>Item Two</wh-tab>
            <wh-tab>Item Three</wh-tab>
          </wh-tabs>         
              <br><code>  &lt;wh-tabs&gt;
            &lt;wh-tab&gt;Item One&lt;/wh-tab&gt;
            &lt;wh-tab&gt;Item Two&lt;/wh-tab&gt;
            &lt;wh-tab&gt;Item Three&lt;/wh-tab&gt;
          &lt;/wh-tabs&gt;</code>
          以上仅为tab简单使用场景，详细用法参见vuetify官网doc
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-expansion-panel>  
    </v-expansion-panels>
  </v-container>
</template>

<script>
  export default {
    name: "PlaygroundCard",
    data: () => ({
      panel: [],
      types: [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' },
        ]
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