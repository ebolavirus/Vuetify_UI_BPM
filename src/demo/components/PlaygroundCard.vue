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
        <v-expansion-panel-header>wh-hyperlink</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-hyperlink href="http://www.baidu.com" label="百度" />
          <br><code>&lt;wh-hyperlink href="http://www.baidu.com" label="百度" /&gt;</code>
          <br>自封组件，href为链接，label为展示文字，不填文字则展示超链接自身
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-loading</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-loading :loading="overlay" />
          <wh-btn @click="overlay = true">打开loading</wh-btn>
          <code>&lt;wh-loading :loading="overlay" /&gt;</code>
          <br>复合组件，loading为boolean，决定是否展示loading
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-textfield</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-textfield label="*办公室位置" placeholder="万华实业前楼" />
          <code>&lt;wh-textfield label="*办公室位置" placeholder="万华实业前楼" disabled
            append-icon="mdi-account-edit"/&gt;</code>
          <br>参考v-text-field，属性一致
        </v-expansion-panel-content>
        <!-- IT顾问评估 -->
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-numberfield</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-numberfield v-model="valuenumber" :isDecimal="false" label="办公室个数" placeholder="please input number"
            append-icon="mdi-bee" />
          <code>&lt;wh-numberfield v-model="valuenumber" :isDecimal="false" label="办公室个数"
            placeholder="please input number" append-icon="mdi-bee" /&gt;</code>
          <br>整体基于v-text-field,最大长度、后缀图标等属性参考v-text-field
          <br>添加变量isDecimal(默认false)，识别是否为整数或小数
          <br>注意，要触发此组件的值变化检测，必须使用v-model进行值绑定，否则可以直接用value赋值
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-moneyfield</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-moneyfield v-model="valuenumber" label="办公室价格" placeholder="please input number" append-icon="mdi-bee" />
          <code>&lt;wh-moneyfield v-model="valuenumber" label="办公室价格"
            placeholder="please input number" append-icon="mdi-bee" /&gt;</code>
          <br>整体基于v-text-field,最大长度、后缀图标等属性参考v-text-field
          <br>注意，要触发此组件的值变化检测，必须使用v-model进行值绑定，否则可以直接用value赋值
        </v-expansion-panel-content>
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
          <wh-select :items="types" label="state" item-text="state" item-value="abbr"></wh-select>
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
          <br><code> &lt;wh-radio-group row&gt;
            &lt;wh-radio label="男" value="radio-1"&gt;&lt;/wh-radio&gt;
            &lt;wh-radio label="女" value="radio-2"&gt;&lt;/wh-radio&gt;
            &lt;/wh-radio-group&gt; </code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-checkbox</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-radio-group row label="办理人：">
            <wh-checkbox label="张三" value="checkbox-1"></wh-checkbox>
            <wh-checkbox label="李四" value="checkbox-2"></wh-checkbox>
          </wh-radio-group>
          <br><code> &lt;wh-radio-group row&gt;
            &lt;wh-checkbox label="张三" value="checkbox-1"&gt;&lt;/wh-checkbox&gt;
            &lt;wh-checkbox label="李四" value="checkbox-2"&gt;&lt;/wh-checkbox&gt;
            &lt;/wh-radio-group&gt; </code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-treeview</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-treeview :items="treeitems" />
          <br><code>&lt;wh-treeview :items="treeitems" /&gt;</code>
          <br>基于v-treeview，默认selected为true
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-layout</v-expansion-panel-header>
        <v-expansion-panel-content>
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
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-table</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table :headers="typeheaders" :items="typedesserts" @item-selected="itemSelected" @click:row="clickRow"
            :items-per-page="5" class="elevation-1">
            <template v-slot:item.name="props">
              <v-edit-dialog :return-value.sync="props.item.name" @save="save" @cancel="cancel" @open="open"
                @close="close"> {{ props.item.name }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.name" label="Edit" single-line counter>
                  </v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn class="mb-2" @click="editItem(item)">选择</v-btn>
            </template>
          </v-data-table>
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
          <br><code> &lt;wh-timeline&gt;
            &lt;wh-timeline-item&gt;timeline item&lt;/wh-timeline-item&gt;
            &lt;wh-timeline-item class="text-right"&gt;timeline item&lt;/wh-timeline-item&gt;
            &lt;wh-timeline-item&gt;timeline item&lt;/wh-timeline-item&gt;
            &lt;/wh-timeline&gt;</code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-tabbar</v-expansion-panel-header>
        <v-expansion-panel-content>
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
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-date-picker</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-date-picker v-model="date" label="日期"></wh-date-picker>        
          <br><code>&lt;wh-date-picker v-model="date" label="日期"/&gt;</code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-time-picker</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-time-picker v-model="time" label="时间"></wh-time-picker>
          <br><code>&lt;wh-time-picker v-model="time" label="时间"/&gt;</code>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>wh-pagination</v-expansion-panel-header>
        <v-expansion-panel-content>
          <wh-pagination v-model="page" :length="4" :value="2"></wh-pagination>         
          <br><code></code>
        </v-expansion-panel-content>
      </v-expansion-panel>        
    </v-expansion-panels>
  </v-container>
</template>

<script>
  export default {
    name: "PlaygroundCard",
    data: () => ({
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
                    name: 'v-btn : ts'
                  },
                  {
                    id: 13,
                    name: 'v-card : ts'
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
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: '公司范围',
          value: 'calories'
        },
        {
          text: 'IT业务顾问',
          value: 'fat'
        },
        {
          text: '说明',
          value: 'carbs'
        },
        {
          text: '操作',
          value: 'action',
          sortable: false
        }
      ],
      typedesserts: [{
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
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
      ]
      time: '',
      page: 2
    }),
    computed: {},
    watch: {
      overlay(val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
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
            closeText: "Yeah!",
            snackbarTimeout: 0
          });
        });
      },
      editItem(aItem) {
        console.log('aaaaa', aItem);
        this.$emit('dialogSelected', aItem);
        this.intypedialog = false;
      },
      clickRow(aItem) {
        console.log("++++++++++++");
        console.log(aItem);
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
      }
    }
  }
</script>

<style scoped>

</style>