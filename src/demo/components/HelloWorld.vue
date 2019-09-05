<template>
  <wh-container>
    <wh-layout>
      <wh-area-panels>
        <wh-area-panel title="服务描述">
          <wh-layout>
            <wh-flex :rowNumber="2">
              <wh-textfield label="*服务类型" append-outer-icon="mdi-file-document-box-search" counter readonly
                @click:append-outer.stop="typeSelect" v-model="typeValue"></wh-textfield>
              <TypeDialog v-model="typedialog" @dialogSelected="typeDialogSelected" />
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="*办公室位置"></wh-textfield>
            </wh-flex>
            <wh-flex :rowNumber="1">
              <wh-textarea label="服务内容"></wh-textarea>
            </wh-flex>
          </wh-layout>
        </wh-area-panel>
        <wh-area-panel title="IT顾问评估">
          <wh-layout>
            <wh-flex :rowNumber="2">
              <wh-radio-group v-model="row" row xs6 sm3 md3>
                <template v-slot:label>
                  <div>变更等级：</div>
                </template>
                <wh-radio label="较小" value="0"></wh-radio>
                <wh-radio label="中等" value="1"></wh-radio>
                <wh-radio label="较大" value="2"></wh-radio>
              </wh-radio-group>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-select :items="serviceTypes" label="服务分类"></wh-select>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="预估费用" type="number" suffix="元"></wh-textfield>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="实施日期" type="date"></wh-textfield>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="办理人员名称" append-outer-icon="mdi-file-document-box-search" readonly
                @click:append-outer.stop="dutySelect" v-model="dutyValue"></wh-textfield>
              <HumanDialog v-model="dutydialog" @dialogSelected="dutyDialogSelected" />
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="通知人员" append-outer-icon="mdi-file-document-box-search" readonly
                @click:append-outer.stop="dutySelect" v-model="dutyValue"></wh-textfield>
              <HumanDialog v-model="dutydialog" @dialogSelected="dutyDialogSelected" />
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textarea label="评估意见"></wh-textarea>
            </wh-flex>
          </wh-layout>
        </wh-area-panel>
        <!-- 办理人办理 -->
        <wh-area-panel title="办理人办理">
          <wh-layout>
            <wh-flex :rowNumber="2">
              <wh-date-picker v-model="date1" label="接收时间"></wh-date-picker>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-date-picker v-model="date2" label="接收日期"></wh-date-picker>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="实际费用"></wh-textfield>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="实际实施"></wh-textfield>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textarea label="办理过程"></wh-textarea>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textarea label="原因分析"></wh-textarea>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textarea label="结果及建议"></wh-textarea>
            </wh-flex>
          </wh-layout>
        </wh-area-panel>
        <!--  -->
        <wh-area-panel title="申请人验收">
          <wh-layout>
            <wh-flex :rowNumber="2">
              <wh-radio-group row>
                <template v-slot:label>
                  <div>是否解决：</div>
                </template>
                <wh-radio label="已解决" value="0"></wh-radio>
                <wh-radio label="未解决" value="1"></wh-radio>
              </wh-radio-group>
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-radio-group row>
                <template v-slot:label>
                  <div>是否满意：</div>
                </template>
                <wh-radio label="满意" value="0"></wh-radio>
                <wh-radio label="不满意" value="1"></wh-radio>
              </wh-radio-group>
            </wh-flex>
            <wh-flex :rowNumber="1">
              <wh-textarea label="验收报告及建议"></wh-textarea>
            </wh-flex>
          </wh-layout>
        </wh-area-panel>
        <wh-area-panel title="附件">
          <iframe src="http://www.baidu.com" style="width: 100%"></iframe>
        </wh-area-panel>
      </wh-area-panels>
    </wh-layout>
  </wh-container>
</template>

<script>
  import TypeDialog from "./TypeDialog";
  import HumanDialog from "./HumanDialog";
  export default {
    components: {
      TypeDialog,
      HumanDialog
    },
    data: () => ({
      panel: [0, 1, 2, 3, 4, 5, 6],
      serviceTypes: ["type1", "type2", "type3", "type4", "type5"],
      typeValue: "AAA天罡火地煞功",
      dutyValue: "",
      typedialog: false,
      dutydialog: false,
      row: "",
      startDateMenu: false,
      endDateMenu: false,
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10)
    }),
    methods: {
      typeSelect() {
        // let aaa = 1;
        // this.typeValue = aaa;
        this.typedialog = !this.typedialog;
      },
      dutySelect() {
        this.dutydialog = !this.dutydialog;
      },
      typeDialogSelected(value) {
        console.log("bbbbb", value);
        this.typeValue = value.name;
      },
      dutyDialogSelected(value) {
        console.log("cccc", value);
        this.dutyValue = value;
      }
    }
  };
</script>
<style>
  .container.grid-list-xl .layout .flex {
    padding: 0 12px;
  }

  .wh-textfield {
    padding-top: 0;
  }
</style>