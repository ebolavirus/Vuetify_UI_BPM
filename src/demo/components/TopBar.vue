<template>
  <wh-topbar color="primary" app clipped-left dark fixed>
    <wh-btn @click="drawerAction()" icon>
      <wh-icon>mdi-menu-open</wh-icon>
    </wh-btn>
    <v-toolbar-title>
      <span class="title mr-2">Vuetify信息服务申请DEMO</span>
    </v-toolbar-title>
    <wh-spacer></wh-spacer>
    <v-toolbar-items>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <wh-btn text @click="submitAction()">
          <span class="mr-2">提交</span>
        </wh-btn>
        <wh-btn text @click="saveAction()">
          <span class="mr-2">保存</span>
        </wh-btn>
        <wh-btn text @click="rejectAction()">
          <span class="mr-2">驳回</span>
        </wh-btn>
        <wh-btn text @click="cancelAction()">
          <span class="mr-2">注销</span>
        </wh-btn>
        <wh-menu bottom left offset-y>
          <template v-slot:activator="{on}">
            <wh-btn text v-on="on">
              <span class="mr-2">高级▾</span>
            </wh-btn>
          </template>
          <wh-list nav>
            <wh-list-item v-for="(item, index) in baritems" :key="index">
              <wh-list-item-title>{{item.title}}</wh-list-item-title>
            </wh-list-item>
          </wh-list>
        </wh-menu>
        <wh-btn text>
          <span class="mr-2">帮助</span>
        </wh-btn>
        <wh-btn text @click="progressGraphAction()">
          <span class="mr-2">流程图</span>
        </wh-btn>
        <wh-btn text>
          <span class="mr-2">关闭</span>
        </wh-btn>
      </template>
      <template v-else>
        <wh-menu offset-y>
          <template v-slot:activator="{on}">
            <wh-btn text v-on="on">
              <span class="mr-2">操作▾</span>
            </wh-btn>
          </template>
          <wh-list>
            <wh-list-item v-for="(item, index) in barminiitems" :key="index">
              <wh-list-item-title>{{item.title}}</wh-list-item-title>
            </wh-list-item>
          </wh-list>
        </wh-menu>
      </template>
    </v-toolbar-items>
    <!-- 提交对话框 -->
    <wh-dialog v-model="dialog2" max-width="800px">
      <wh-card>
        <wh-card-title>审批人</wh-card-title>
        <wh-card-text>
          <wh-layout>
            <wh-flex :rowNumber="1">
              <wh-textarea label="审批意见" counter="300" value="同意" clearable />
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="下一任务" value="IT顾问评估" />
            </wh-flex>
            <wh-flex :rowNumber="2">
              <wh-textfield label="任务类型" value="单一签核" />
            </wh-flex>
            <wh-flex :rowNumber="1">
              <wh-table :headers="apHeaders" :items="approvers" :showFooter="false" :showSelect="true"
                :singleSelect="true" />
            </wh-flex>
          </wh-layout>
        </wh-card-text>
        <wh-card-actions>
          <wh-btn color="primary" text @click="dialog2 = false">关闭</wh-btn>
          <wh-btn color="primary" text @click="dialog2 = false">提交</wh-btn>
        </wh-card-actions>
      </wh-card>
    </wh-dialog>
    <!-- 流程图对话框 http://bpmqas02.whchem.com/ECS_BPM_ADV/jsp/trdpty/processMapNew.jsp?bpdId=25.3e223090-6578-4686-98da-1ab9b0d1feff&appShortName=ITAPP&tsPiid=PIID-6a769121-f3cc-4dff-9cd7-4b9e1ff1bf62&snapshotId=2064.25fda463-fbb1-448d-ae01-c0791db69ea1 -->
    <wh-dialog v-model="dialog3" max-width="1000px">
      <wh-card>
        <wh-card-title>流程图</wh-card-title>
        <wh-card-text>
          <wh-layout align-center justify-center>
            <wh-img src="http://www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super"
              aspect-ratio="1" class="grey lighten-2" max-width="1000" max-height="680" contain />
          </wh-layout>
        </wh-card-text>
        <wh-card-actions>
          <wh-btn color="primary" text @click="dialog3 = false">关闭</wh-btn>
        </wh-card-actions>
      </wh-card>
    </wh-dialog>
    <!-- 驳回对话框 -->
    <wh-dialog v-model="dialog5" max-width="800px">
      <wh-card>
        <wh-card-title>任务驳回</wh-card-title>
        <wh-card-text>
          <wh-layout>
            <wh-flex :rowNumber="2">
              <wh-select :items="['起草@Draft']" label="驳回到环节" required />
            </wh-flex>
            <wh-flex :rowNumber="1">
              <wh-textarea label="审批意见" counter="300" value="同意" clearable required />
            </wh-flex>
          </wh-layout>
        </wh-card-text>
        <wh-card-actions>
          <wh-btn color="primary" text @click="dialog5 = false">关闭</wh-btn>
          <wh-btn color="primary" text @click="dialog5 = false">驳回</wh-btn>
        </wh-card-actions>
      </wh-card>
    </wh-dialog>
    <!-- 注销流程 -->
    <wh-dialog v-model="dialog4" max-width="300px">
      <wh-card>
        <wh-card-title>注销流程</wh-card-title>
        <wh-card-text>您确定要注销当前单据吗？</wh-card-text>
        <wh-card-actions>
          <wh-btn color="primary" text @click="dialog4 = false">关闭</wh-btn>
          <wh-btn color="primary" text @click="dialog4 = false">注销</wh-btn>
        </wh-card-actions>
      </wh-card>
    </wh-dialog>
  </wh-topbar>
</template>

<script>
  export default {
    model: {
      prop: "drawerprop",
      event: "itemChanged"
    },
    props: {
      drawerprop: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      drawer: {
        get() {
          return this.drawerprop;
        },
        set(value) {
          this.$emit("itemChanged", value);
        }
      }
    },
    data: () => ({
      baritems: [{
          title: "加签"
        },
        {
          title: "转办"
        },
        {
          title: "通知"
        }
      ],
      barminiitems: [{
          title: "提交"
        },
        {
          title: "驳回"
        },
        {
          title: "通知"
        },
        {
          title: "加签"
        },
        {
          title: "转办"
        },
        {
          title: "注销"
        },
        {
          title: "关闭"
        },
        {
          title: "保存"
        },
        {
          title: "帮助"
        },
        {
          title: "流程图"
        }
      ],
      dialog2: false,
      dialog3: false,
      // 注销对话框开关
      dialog4: false,
      // 驳回对话框开关
      dialog5: false,
      apHeaders: [{
          text: "名称",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "部门",
          value: "dept"
        }
      ],
      approvers: [{
          name: "何凭",
          dept: "/万华集团/万华化学/信息中心/基础设施"
        },
        {
          name: "王海洋",
          dept: "/万华集团/万华化学/信息中心/基础设施"
        }
      ],
      selectedApprover: []
    }),
    methods: {
      drawerAction() {
        this.$emit("drawerclick");
      },
      submitAction() {
        this.dialog2 = true;
      },
      progressGraphAction() {
        this.dialog3 = true;
      },
      saveAction() {
        this.$alert("保存成功！");
      },
      cancelAction() {
        this.dialog4 = true;
      },
      rejectAction() {
        this.dialog5 = true;
      }
    }
  };
</script>
<style scoped>
.v-menu__content {
  position: fixed !important;
}
</style>