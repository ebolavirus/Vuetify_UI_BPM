<template>
  <v-container>
    <wh-area-panels>
      <wh-area-panel title="wh-logo">
        <wh-logo></wh-logo><br>
        <code>&lt;wh-logo&gt;&lt;/wh-logo&gt;</code>
      </wh-area-panel>
      <wh-area-panel title="wh-icon">
        <wh-icon color="primary">mdi-car-light-fog</wh-icon>
        <br><code>&lt;wh-icon&gt;mdi-car-light-fog&lt;/wh-icon&gt;</code>
        <br>详见http://materialdesignicons.com/
      </wh-area-panel>
      <wh-area-panel title="wh-hyperlink">
        <wh-hyperlink href="http://www.baidu.com" label="百度" />
        <br><code>&lt;wh-hyperlink href="http://www.baidu.com" label="百度" /&gt;</code>
        <br>自封组件，href为链接，label为展示文字，不填文字则展示超链接自身
      </wh-area-panel>
      <wh-area-panel title="wh-loading">
        <wh-loading :loading="overlay" />
        <wh-btn @click="overlay = true">打开loading</wh-btn>
        <code>&lt;wh-loading :loading="overlay" /&gt;</code>
        <br>复合组件，loading为boolean，决定是否展示loading
      </wh-area-panel>
      <wh-area-panel title="wh-textfield">
        <wh-textfield label="*办公室位置" placeholder="万华实业前楼" />
        <code>&lt;wh-textfield label="*办公室位置" placeholder="万华实业前楼" disabled
          append-icon="mdi-account-edit"/&gt;</code>
        <br>参考v-text-field，属性一致
      </wh-area-panel>
      <wh-area-panel title="wh-numberfield">
        <wh-numberfield v-model="valuenumber" :isDecimal="false" label="办公室个数" placeholder="please input number"
          append-icon="mdi-bee" />
        <code>&lt;wh-numberfield v-model="valuenumber" :isDecimal="false" label="办公室个数"
          placeholder="please input number" append-icon="mdi-bee" /&gt;</code>
        <br>整体基于v-text-field,最大长度、后缀图标等属性参考v-text-field
        <br>添加变量isDecimal(默认false)，识别是否为整数或小数
        <br>注意，要触发此组件的值变化检测，必须使用v-model进行值绑定，否则可以直接用value赋值
      </wh-area-panel>
      <wh-area-panel title="wh-moneyfield">
        <wh-moneyfield v-model="valuenumber" label="办公室价格" placeholder="please input number" append-icon="mdi-bee" />
        <code>&lt;wh-moneyfield v-model="valuenumber" label="办公室价格"
          placeholder="please input number" append-icon="mdi-bee" /&gt;</code>
        <br>整体基于v-text-field,最大长度、后缀图标等属性参考v-text-field
        <br>注意，要触发此组件的值变化检测，必须使用v-model进行值绑定，否则可以直接用value赋值
      </wh-area-panel>
      <wh-area-panel title="wh-textarea">
        <wh-textarea label="评估意见" auto-grow disabled light placeholder="请填写评估意见" value="请填写评估意">
        </wh-textarea>
        <br><code>&lt;wh-textarea label="评估意见" light placeholder="请填写评估意见" value=""&gt;</code>
      </wh-area-panel>
      <wh-area-panel title="wh-btn">
        <wh-btn depressed block color="indigo" dark>Button</wh-btn>
        <br><code>&lt;wh-btn depressed block color="indigo" dark&gt;Button&lt;/wh-btn&gt;</code>
      </wh-area-panel>
      <wh-area-panel title="wh-select">
        <wh-select :items="types" label="state" item-text="state" item-value="abbr"></wh-select>
        <br><code>&lt;wh-select :items="types" label="state" item-text="state"
          item-value="abbr"&gt;&lt;/wh-select&gt;</code>
      </wh-area-panel>
      <wh-area-panel title="wh-radio">
        <wh-radio-group label="性别" v-model="radioValue">
          <wh-radio label="男" value="radio-1"></wh-radio>
          <wh-radio label="女" value="radio-2"></wh-radio>
        </wh-radio-group>
        <br><code> &lt;wh-radio-group label="性别"&gt;
          &lt;wh-radio label="男" value="radio-1"&gt;&lt;/wh-radio&gt;
          &lt;wh-radio label="女" value="radio-2"&gt;&lt;/wh-radio&gt;
          &lt;/wh-radio-group&gt; </code>
      </wh-area-panel>
      <wh-area-panel title="wh-checkbox">
        <wh-radio-group label="办理人：">
          <wh-checkbox v-model="checkboxValue" label="张三" value="checkbox-1" key="1"></wh-checkbox>
          <wh-checkbox v-model="checkboxValue" label="李四" value="checkbox-2" key="2"></wh-checkbox>
        </wh-radio-group>
        <br><code> &lt;wh-radio-group label="办理人"&gt;
          &lt;wh-checkbox v-model="checkboxValue" label="张三" value="checkbox-1"&gt;&lt;/wh-checkbox&gt;
          &lt;wh-checkbox v-model="checkboxValue" label="李四" value="checkbox-2"&gt;&lt;/wh-checkbox&gt;
          &lt;/wh-radio-group&gt; </code>
      </wh-area-panel>
      <wh-area-panel title="wh-treeview">
        <wh-treeview :items="treeitems" />
        <br><code>&lt;wh-treeview :items="treeitems" /&gt;</code>
        <br>基于v-treeview，默认selected为true
      </wh-area-panel>
      <wh-area-panel title="wh-dialog">
        <wh-btn color="primary" dark @click.stop="showDialog = true">
          Open Dialog
        </wh-btn>
        <wh-dialog v-model="showDialog" max-width="290">
          <wh-card>
            <wh-card-title class="headline">Wanhua Dialog</wh-card-title>
            <wh-card-text>
              Only clevers can see the dialog now!
            </wh-card-text>
            <wh-card-actions>
              <div class="flex-grow-1"></div>
              <wh-btn color="green darken-1" text @click="showDialog = false">
                Disagree
              </wh-btn>
              <wh-btn color="green darken-1" text @click="showDialog = false">
                Agree
              </wh-btn>
            </wh-card-actions>
          </wh-card>
        </wh-dialog>
        <wh-btn color="primary" dark @click="showModelDialog">
          模态对话框
        </wh-btn>
        <br>复杂对话框请参考源码的demo/components/HumanDialog写法</code>
      </wh-area-panel>
      <wh-area-panel title="wh-layout & wh-flex">
        <wh-layout>
          <wh-flex :rowNumber="2">
            <wh-textfield label="一行两列" placeholder="万华实业前楼" />
          </wh-flex>
          <wh-flex :rowNumber="2">
            <wh-textfield label="一行两列" placeholder="万华实业前楼" />
          </wh-flex>
          <wh-flex :rowNumber="3">
            <wh-textfield label="一行三列" placeholder="万华实业前楼" />
          </wh-flex>
          <wh-flex :rowNumber="3">
            <wh-textfield label="一行三列" placeholder="万华实业前楼" />
          </wh-flex>
          <wh-flex :rowNumber="3">
            <wh-textfield label="一行三列" placeholder="万华实业前楼" />
          </wh-flex>
          <wh-flex :rowNumber="1">
            <wh-textfield label="一行一列" placeholder="万华实业前楼" />
          </wh-flex>
        </wh-layout>
        <br><code>
          &lt;wh-layout>
          &lt;wh-flex :rowNumber="2"&gt;
          &lt;wh-textfield label="一行两列" placeholder="万华实业前楼" /&gt;
          &lt;wh-flex&gt;
          &lt;wh-flex :rowNumber="2"&gt;
          &lt;wh-textfield label="一行两列" placeholder="万华实业前楼" /&gt;
          &lt;wh-flex&gt;
          &lt;wh-flex :rowNumber="3"&gt;
          &lt;wh-textfield label="一行三列" placeholder="万华实业前楼" /&gt;
          &lt;wh-flex&gt;
          &lt;wh-flex :rowNumber="3"&gt;
          &lt;wh-textfield label="一行三列" placeholder="万华实业前楼" /&gt;
          &lt;wh-flex&gt;
          &lt;wh-flex :rowNumber="3"&gt;
          &lt;wh-textfield label="一行三列" placeholder="万华实业前楼" /&gt;
          &lt;/wh-flex&gt;
          &lt;wh-flex :rowNumber="1"&gt;
          &lt;wh-textfield label="一行一列" placeholder="万华实业前楼" /&gt;
          &lt;/wh-flex&gt;
          &lt;/wh-layout&gt;</code>
        <br>基于v-layout和v-flex
        <br>使用方法视上方demo，最外层嵌套wh-layout,内部使用wh-flex标签动态拼接元素，元素的rowNumber默认为1，允许值包含1,2,3,4
      </wh-area-panel>
      <wh-area-panel title="wh-table">
        <wh-table :headers="typeheaders" :items="typedesserts" :actions="typeActions" @item-selected="itemSelected"
          :showSelect="true" :singleSelect="false" :mobileExpandable="true" @click:row="clickRow"
          @inline-edit="inlineEditFunction" height="300px" mobileheight="600px" @submitEvent="submitTest"
          @deleteEvent="deleteTest">
          <wh-pagination v-model="itemCount"></wh-pagination>
        </wh-table>
        <br><code>
          &lt;wh-table :headers="typeheaders" :items="typedesserts" :actions="typeActions"
          @item-selected="itemSelected"
          :showSelect="true" :singleSelect="false" @click:row="clickRow" @inline-edit="inlineEditFunction"
          @submitEvent="submitTest" class="elevation-1" &gt; @deleteEvent="deleteTest"
          &lt;wh-pagination v-model="itemCount"&gt;&lt;/wh-pagination&gt;
          &lt;/wh-table&gt;</code>
        <br>基于v-simple-table(非v-data-table)封装，添加了动作按钮、行点击事件、行内编辑、单选、多选事件。
      </wh-area-panel>
      <wh-area-panel title="wh-timeline">
        <wh-timeline>
          <wh-timeline-item>timeline item</wh-timeline-item>
          <wh-timeline-item class="text-right">timeline item</wh-timeline-item>
          <wh-timeline-item>timeline item</wh-timeline-item>
        </wh-timeline>
        <br><code> &lt;wh-timeline&gt;
          &lt;wh-timeline-item&gt;timeline item&lt;/wh-timeline-item&gt;
          &lt;wh-timeline-item class="text-right"&gt;timeline item&lt;/wh-timeline-item&gt;
          &lt;wh-timeline-item&gt;timeline item&lt;/wh-timeline-item&gt;
          &lt;/wh-timeline&gt;</code>
      </wh-area-panel>
      <wh-area-panel title="wh-tabbar">
        <wh-tabs>
          <wh-tab>Item One</wh-tab>
          <wh-tab>Item Two</wh-tab>
          <wh-tab>Item Three</wh-tab>
        </wh-tabs>
        <br><code> &lt;wh-tabs&gt;
          &lt;wh-tab&gt;Item One&lt;/wh-tab&gt;
          &lt;wh-tab&gt;Item Two&lt;/wh-tab&gt;
          &lt;wh-tab&gt;Item Three&lt;/wh-tab&gt;
          &lt;/wh-tabs&gt;</code>
        以上仅为tab简单使用场景，详细用法参见vuetify官网doc
      </wh-area-panel>
      <wh-area-panel title="wh-date-picker">
        <wh-layout>
          <wh-flex :rowNumber="3">
            <wh-date-picker disabled v-model="date" label="日期:"></wh-date-picker>
          </wh-flex>
        </wh-layout>
        <br><code>&lt;wh-date-picker v-model="date" label="日期"/&gt;</code>
      </wh-area-panel>
      <wh-area-panel title="wh-time-picker">
        <wh-layout>
          <wh-flex :rowNumber="3">
            <wh-time-picker disabled v-model="time" label="时间"></wh-time-picker>
          </wh-flex>
        </wh-layout>
        <br><code>&lt;wh-time-picker v-model="time" label="时间"/&gt;</code>
      </wh-area-panel>
      <wh-area-panel title="wh-pagination">
        <wh-pagination simple v-model="itemCount"></wh-pagination>
        <wh-pagination v-model="itemCount"></wh-pagination>
        <br><code>&lt;wh-pagination v-model="itemCount"/&gt;</code>
        <br>完全自封装组件
      </wh-area-panel>
    </wh-area-panels>
  </v-container>
</template>

<script>
  export default {
    name: "PlaygroundCard",
    data: () => ({
      radioValue: '',
      checkboxValue: [],
      panel: [],
      overlay: false,
      valuenumber: '0',
      types: [{
          state: 'Florida',
          abbr: 'FL'
        },
        {
          state: 'Georgia',
          abbr: 'GA'
        },
        {
          state: 'Nebraska',
          abbr: 'NE'
        },
        {
          state: 'California',
          abbr: 'CA'
        },
        {
          state: 'New York',
          abbr: 'NY'
        },
      ],
      showDialog: false,
      date: new Date().toISOString().substr(0, 10),
      time: '',
      treeitems: [{
          id: 1,
          name: 'Applications :',
          children: [{
              id: 2,
              name: 'Calendar : app'
            },
            {
              id: 3,
              name: 'Chrome : app'
            },
            {
              id: 4,
              name: 'Webstorm : app'
            },
          ],
        },
        {
          id: 5,
          name: 'Documents :',
          children: [{
              id: 6,
              name: 'vuetify :',
              children: [{
                id: 7,
                name: 'src :',
                children: [{
                    id: 8,
                    name: 'index : ts'
                  },
                  {
                    id: 9,
                    name: 'bootstrap : ts'
                  },
                ],
              }, ],
            },
            {
              id: 10,
              name: 'material2 :',
              children: [{
                id: 11,
                name: 'src :',
                children: [{
                    id: 12,
                    name: 'wh-btn : ts'
                  },
                  {
                    id: 13,
                    name: 'wh-card : ts'
                  },
                  {
                    id: 14,
                    name: 'v-window : ts'
                  },
                ],
              }, ],
            },
          ],
        },
        {
          id: 15,
          name: 'Downloads :',
          children: [{
              id: 16,
              name: 'October : pdf'
            },
            {
              id: 17,
              name: 'November : pdf'
            },
            {
              id: 18,
              name: 'Tutorial : html'
            },
          ],
        },
        {
          id: 19,
          name: 'Videos :',
          children: [{
              id: 20,
              name: 'Tutorials :',
              children: [{
                  id: 21,
                  name: 'Basic layouts : mp4'
                },
                {
                  id: 22,
                  name: 'Advanced techniques : mp4'
                },
                {
                  id: 23,
                  name: 'All about app : dir'
                },
              ],
            },
            {
              id: 24,
              name: 'Intro : mov'
            },
            {
              id: 25,
              name: 'Conference introduction : avi'
            },
          ],
        },
      ],
      typeheaders: [{
          text: '变更类型',
          editable: true,
          value: 'name'
        },
        {
          text: '公司范围',
          value: 'calories',
          editable: true,
          dicMapSource: [{
            label: 'label1',
            value: '1',
          }, {
            label: 'label2',
            value: '2',
          }, {
            label: 'label3',
            value: '3',
          }, {
            label: 'label4',
            value: '4',
          }]
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: '说明',
          value: 'carbs'
        }
      ],
      typeActions: [{
        text: '提交',
        icon: 'mdi-pencil',
        actionName: 'submitEvent'
      }, {
        text: '删除',
        icon: 'mdi-delete',
        actionName: 'deleteEvent'
      }],
      typedesserts: [{
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 666666666666666666666666,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 2,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 3,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
      time: '',
      itemCount: 32
    }),
    computed: {},
    watch: {
      overlay(val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
      checkboxValue(to) {
        console.log('checkboxchanged', to);
      },
      radioValue(to) {
        console.log('radioChanged', to);
      }
    },
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
            snackbarTimeout: 0
          });
        });
      },
      clickRow(aItem) {
        console.log("++++++++++++");
        console.log(aItem);
      },
      itemSelected(item, value) {
        console.log('itemSelected');
        console.log(item, value);
      },
      save() {
        console.log('aItem saved');
      },
      cancel() {
        console.log('aItem canceled');
      },
      open() {
        console.log('aItem opened');
      },
      close() {
        console.log('aItem closed');
      },
      itemSelected(item, value) {
        console.log('itemSelected');
        console.log(item)
      },
      showModelDialog() {
        this.$alert('ffffff');
      },
      inlineEditFunction() {

      },
      submitTest() {
        console.log('submit test...');
      },
      deleteTest() {
        console.log('delete test');
      }
    }
  }
</script>

<style scoped>

</style>