<template>
  <wh-drawer app v-model="drawer" dark>
    <wh-area-panels>
      <wh-area-panel title="基本信息">
        <wh-textfield v-for="(item, index) in desserts" :key="index" :label="item.name" :value="item.calories" />
      </wh-area-panel>
      <wh-area-panel title="审批历史">
        <wh-timeline dense>
          <wh-timeline-item color="amber lighten-1" fill-dot right small>
            <wh-card>
              <wh-card-title class="amber">
                <span class="white--text">当前环节</span>
              </wh-card-title>
              <wh-container>
                <wh-layout>
                  <wh-flex>
                    孙明明(mmsuna)<br>单一签核
                  </wh-flex>
                </wh-layout>
              </wh-container>
            </wh-card>
          </wh-timeline-item>
          <wh-timeline-item color="green lighten-1" fill-dot right>
            <wh-card>
              <wh-card-title class="green lighten-1">
                <span class="white--text">起草-提交</span>
              </wh-card-title>
              <wh-container>
                <wh-layout>
                  <wh-flex>
                    孙明明(mmsuna)<br>2019-7-19 10:36:26<br>用时0天<br>同意
                  </wh-flex>
                </wh-layout>
              </wh-container>
            </wh-card>
          </wh-timeline-item>
          <wh-timeline-item color="green lighten-1" fill-dot right>
            <wh-card>
              <wh-card-title class="green lighten-1">
                <span class="white--text">起草-提交</span>
              </wh-card-title>
              <wh-container>
                <wh-layout>
                  <wh-flex>
                    孙明明(mmsuna)<br>2019-7-19 10:36:26<br>用时0天<br>同意
                  </wh-flex>
                </wh-layout>
              </wh-container>
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
      prop: 'drawerprop',
      event: 'itemChanged'
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
          return this.drawerprop
        },
        set(value) {
          this.$emit('itemChanged', value);
        }
      }
    },
    data: () => ({
      panel: [0, 1],
      items: [{
          title: 'Dashboard',
          icon: 'dashboard'
        },
        {
          title: 'Account',
          icon: 'account_box'
        },
        {
          title: 'Admin',
          icon: 'gavel'
        }
      ],
      headers: [{
          text: '',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: '',
          value: 'calories'
        }
      ],
      desserts: [{
          name: '申请单号',
          calories: 'IT20190700909'
        },
        {
          name: '申请日期',
          calories: '2019-7-19 10:36:26'
        },
        {
          name: '申请人',
          calories: '孙明明（mmsuna）'
        },
        {
          name: '联系方式',
          calories: '18153517065'
        },
        {
          name: '所属组织',
          calories: '/万华集团/万华化学集团股份有限公司/信息中心/协同办公'
        }
      ]
    })
  };
</script>