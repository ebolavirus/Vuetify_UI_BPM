<template>
  <wh-drawer app clipped v-model="drawer" width="350">
    <wh-container>
      <wh-area-panels>
        <wh-area-panel title="基本信息">
          <!-- <v-card class="mx-auto" max-width="600" tile> -->
          <v-list dense disabled>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in desserts" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon" color="primary"></v-icon>
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
          <wh-timeline dense>
            <wh-timeline-item right small icon="mdi-pencil">
              <div class="py-2">
                <div class="primary--text font-weight-bold">Lorem ipsum</div>
                <div class="primary--text">
                  孙明明(mmsunA)<br>
                  抢单签核
                </div>
              </div>
            </wh-timeline-item>
            <wh-timeline-item color="grey lighten-1" right small icon="mdi-check">
              <div class="py-2">
                <div class="grey--text font-weight-bold">起草-提交</div>
                <div class="grey--text">
                  孙明明(mmsunA)<br>
                  2019-7-19 10:36:26 --- 2019-7-19 11:36:26<br>
                  用时 0 天
                </div>
              </div>
            </wh-timeline-item>
            <wh-timeline-item color="grey lighten-1" right small icon="mdi-check">
              <div class="py-2">
                <div class="grey--text font-weight-bold">起草-提交</div>
                <div class="grey--text">
                  孙明明(mmsunA)<br>
                  2019-7-19 10:36:26 --- 2019-7-19 11:36:26<br>
                  用时 0 天
                </div>
              </div>
            </wh-timeline-item>
          </wh-timeline>
        </wh-area-panel>
      </wh-area-panels>
    </wh-container>
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