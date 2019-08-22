<template>
  <v-container class="text-center">
    <v-row class="mb-6" no-gutters>
      <v-col cols="9">
        <v-pagination v-model="whpassvalue" v-bind="$attrs" v-on="$listeners"></v-pagination>

      </v-col>
      <v-col cols="3" align-self="center">
        <span class="ml20">第</span>
        <span class="page-jump-to">
          <input type="type" v-model="jumpPageNumber" />
        </span>
        <span>页</span>
        <span class="page-item jump-go-btn" @click="goPage(jumpPageNumber)">GO</span>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "wh-pagination",
  model: {
    prop: "page",
    event: "whpageChanged"
  },
  props: {
    page: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      jumpPageNumber: "1"
    };
  },
  methods: {
    goPage(jumpPageNumber) {
      this.whpassvalue = parseInt(jumpPageNumber);
    }
  },
  computed: {
    whpassvalue: {
      get() {
        //回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
        console.log("sssssss", this.page);
        return this.page;
      },
      set(val) {
        //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
        this.$emit("whpageChanged", val);
      }
    }
  }
};
</script>
<style scoped>
.page-jump-to input {
  width: 45px;
  height: 26px;
  font-size: 13px;
  border: 1px solid #aaa;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  text-align: center;
}
</style>