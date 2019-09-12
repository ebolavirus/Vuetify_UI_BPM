<template>
  <wh-drawer app clipped v-model="drawer" width="350">
    <wh-area-panels>
      <wh-area-panel title="基本信息">
        <!-- <v-card class="mx-auto" max-width="600" tile> -->
        <v-list dense readonly>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in desserts" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon" color="blue"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <!-- <v-list-item-subtitle v-html="item.content" ></v-list-item-subtitle> -->
                <span style="font-size:14px">{{item.content }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <!-- </v-card> -->
      </wh-area-panel>
      <wh-area-panel title="审批历史">
        <wh-timeline dense >
          <wh-timeline-item right small icon="mdi-pencil">
            <wh-card class="elevation-2">
              <wh-card-title class="subtitle-1">
                <span class="blue--text">当前环节：二级审批</span>
              </wh-card-title>
              <wh-card-text class="body-3">
                <span class="blue--text">孙明明(mmsunA)</span>
                <br />
                <span class="blue--text">抢单签核</span>
              </wh-card-text>
            </wh-card >
          </wh-timeline-item>
          <wh-timeline-item color="grey lighten-1" right small icon="mdi-check">
            <wh-card class="elevation-2">
              <wh-card-title class="subtitle-1">
                <span class="grey--text text--lighten-1">起草-提交</span>
              </wh-card-title>
              <wh-card-text class="body-2">
                <span class="grey--text">孙明明(mmsunA)</span>
                <br />
                <span class="grey--text">2019-7-19 10:36:26 --- 2019-7-19 11:36:26</span>
                <br />
                <span class="grey--text">用时 0 天</span>
              </wh-card-text>
            </wh-card>
          </wh-timeline-item>
          <wh-timeline-item color="grey lighten-1" right small icon="mdi-check">
            <wh-card class="elevation-2">
              <wh-card-title class="subtitle-1">
                <span class="grey--text text--lighten-1">一级审批</span>
              </wh-card-title>
              <wh-card-text class="body-2">
                <span class="grey--text">孙明明(mmsunA)</span>
                <br />
                <span class="grey--text">2019-7-19 10:36:26 --- 2019-7-19 11:36:26</span>
                <br />
                <span class="grey--text">用时 0 天</span>
                <br />
                <span class="grey--text">审批意见审批意见审批意见审批意见审批意见审批意见</span>
                <br />
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
          value: "content"
        }
      ],
      desserts: [{
          name: "申请单号",
          content: "IT20190700909",
          icon: "mdi-format-list-numbered"
        },
        {
          name: "申请日期",
          content: "2019-7-19 10:36:26",
          icon: "mdi-clock"
        },
        {
          name: "申请人",
          content: "孙明明（mmsuna）",
          icon: "mdi-account"
        },
        {
          name: "联系方式",
          content: "18153517065",
          icon: "mdi-cellphone"
        },
        {
          name: "所属组织",
          content: "/万华集团/万华化学集团股份有限公司/信息中心/协同办公",
          icon: "mdi-bookmark-multiple-outline"
        }
      ]
    })
  };
</script>