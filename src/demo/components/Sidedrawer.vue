<template>
  <wh-drawer app v-model="drawer">
    <wh-area-panels>
      <wh-area-panel title="基本信息">
        <wh-text v-for="(item, index) in desserts" :key="index" :label="item.name" :value="item.calories" />
      </wh-area-panel>
      <wh-area-panel title="审批历史">
        <wh-timeline dense>
          <wh-timeline-item color="blue darken-2" icon="mdi-pencil">
            <wh-card class="elevation-2">
              <wh-card-title class="blue darken-2">
                <span class="white--text subtitle-1">当前环节</span>
              </wh-card-title>
              <wh-card-text class="body-2">
                <span class="black--text">孙明明(mmsunA)</span>
                </br>
                <span class="black--text">抢单签核</span>
              </wh-card-text>
            </wh-card>
          </wh-timeline-item>
          <wh-timeline-item color="green lighten-1" icon="mdi-check">
            <wh-card class="elevation-2">
              <wh-card-title class="green lighten-2">
                <span class="white--text subtitle-1">起草-提交</span>
              </wh-card-title>
              <wh-card-text class="body-2">
                <span class="green--text">孙明明(mmsunA)</span></br>
                <span class="green--text">2019-7-19 10:36:26 --- 2019-7-19 11:36:26</span></br>
                <span class="green--text">用时 0 天</span>
              </wh-card-text>
            </wh-card>
          </wh-timeline-item>
          <wh-timeline-item color="green lighten-1" icon="mdi-check">
            <wh-card class="elevation-2">
              <wh-card-title class="green lighten-2">
                <span class="white--text subtitle-1">一级审批</span>
              </wh-card-title>
              <wh-card-text class="body-2">
                <span class="green--text">孙明明(mmsunA)</span>
                </br>
                <span class="green--text">2019-7-19 10:36:26 --- 2019-7-19 11:36:26</span></br>
                <span class="green--text">用时 0 天</span></br>
                <span class="green--text">审批意见审批意见审批意见审批意见审批意见审批意见</span></br>
              </wh-card-text>
            </wh-card>
          </wh-timeline-item>
        </wh-timeline>
      </wh-area-panel>
    </wh-area-panels>
  </wh-drawer>
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
      panel: [0, 1],
      items: [{
          title: "Dashboard",
          icon: "dashboard"
        },
        {
          title: "Account",
          icon: "account_box"
        },
        {
          title: "Admin",
          icon: "gavel"
        }
      ],
      headers: [{
          text: "",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "",
          value: "calories"
        }
      ],
      desserts: [{
          name: "申请单号",
          calories: "IT20190700909"
        },
        {
          name: "申请日期",
          calories: "2019-7-19 10:36:26"
        },
        {
          name: "申请人",
          calories: "孙明明（mmsuna）"
        },
        {
          name: "联系方式",
          calories: "18153517065"
        },
        {
          name: "所属组织",
          calories: "/万华集团/万华化学集团股份有限公司/信息中心/协同办公"
        }
      ]
    })
  };
</script>