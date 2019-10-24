<template>
  <div class="v-data-footer">
    <v-btn text icon @click="btnClick(1)">
      <v-icon>mdi-skip-previous</v-icon>
    </v-btn>
    <v-btn text icon style="transform:rotate(180deg);" @click="btnClick(2)">
      <v-icon>mdi-play</v-icon>
    </v-btn>
    <div class="v-data-footer__pagination">{{numFrom}} to {{numTo}}</div>
    <v-btn text icon @click="btnClick(3)">
      <v-icon>mdi-play</v-icon>
    </v-btn>
    <v-btn text icon @click="btnClick(4)">
      <v-icon>mdi-skip-next</v-icon>
    </v-btn>
    <template v-if="!simple">
      Page:
      <wh-select class="v-data-footer__select" :items="pageArray" v-model="currentPage" />
      <!--<wh-select :value="getObject(item2, item3)" :items="item3.dicMapSource" item-text="label"
                    item-value="value" @change="changeValue($event,key2,key3)" />-->
      Rows per page:
      <wh-select class="v-data-footer__select" :items="countPerRow" v-model="currentCountPerRow" />
    </template>
  </div>
</template>

<script>
  export default {
    name: "wh-pagination",
    model: {
      prop: "itemNum",
      event: "itemNumChanged"
    },
    data() {
      let maxResult = 0;
      if (this.itemNum === 0) {
        maxResult = 1;
      } else {
        maxResult = parseInt((this.itemNum - 1) / 10) + 1;
      }
      return {
        countPerRow: [5, 10, 15, 20, 25, 30],
        currentCountPerRow: 10,
        currentPage: 1,
        maxPage: maxResult
      };
    },
    props: {
      itemNum: {
        type: Number,
        default: 5
      },
      simple: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      currentPage(to) {
        this.$emit("pageChanged", to);
      },
      itemNum(to) {
        this.currentPage = 1;
        this.maxPage = this.getPageNumByItemNum(to);
      },
      currentCountPerRow(to) {
        this.currentPage = 1;
        this.maxPage = this.getPageNumByItemNum(this.itemNum);
        this.$emit("numPerPageChanged", to);
      }
    },
    computed: {
      pageArray() {
        let array = [];
        for (let i = 1; i <= this.maxPage; i++) {
          array.push(i);
        }
        return array;
      },
      numFrom() {
        if (this.itemNum === 0) {
          return 0;
        }
        return (this.currentPage - 1) * this.currentCountPerRow + 1;
      },
      numTo() {
        return this.currentPage * this.currentCountPerRow > this.itemNum ?
          this.itemNum :
          this.currentPage * this.currentCountPerRow;
      }
    },
    methods: {
      getPageNumByItemNum(aItemNum) {
        let maxResult = 0;
        if (aItemNum === 0) {
          maxResult = 1;
        } else {
          maxResult = parseInt((aItemNum - 1) / this.currentCountPerRow) + 1;
        }
        //强转以防止意外发生
        return parseInt(maxResult);
      },
      choosePageCount(acount) {
        this.currentCountPerRow = acount;
      },
      choosePage(acount) {
        this.currentPage = acount;
      },
      btnClick(aIndex) {
        switch (aIndex) {
          case 1:
            this.currentPage = 1;
            break;
          case 2:
            this.currentPage > 1 && this.currentPage--;
            break;
          case 3:
            this.currentPage < this.maxPage && this.currentPage++;
            break;
          case 4:
            this.currentPage = this.maxPage;
            break;
        }
      }
    }
  };
</script>