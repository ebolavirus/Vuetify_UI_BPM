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
    Page:
    <v-select class="v-data-footer__select" :items="pageArray" v-model="currentPage" />
    Rows per page:
    <v-select class="v-data-footer__select" :items="countPerRow" v-model="currentCountPerRow" />
  </div>
</template>

<script>
  export default {
    name: 'wh-pagination',
    data() {
      return {
        countPerRow: [5, 10, 15, 20, 25, 30],
        currentCountPerRow: 10,
        currentPage: 1,
        maxPage: this.pageNum
      }
    },
    props: {
      pageNum: {
        type: Number,
        default: 3
      }
    },
    watch: {
      currentPage(to) {
        this.$emit('pageChanged', to)
      },
      currentCountPerRow(to) {
        this.$emit('numPerPageChanged', to)
      }
    },
    computed: {
      pageArray() {
        let array = []
        for (let i = 1; i <= this.maxPage; i++) {
          array.push(i)
        }
        return array
      },
      numFrom() {
        return (this.currentPage - 1) * this.currentCountPerRow + 1
      },
      numTo() {
        return this.currentPage * this.currentCountPerRow
      }
    },
    methods: {
      choosePageCount(acount) {
        console.log(acount)
        this.currentCountPerRow = acount
      },
      choosePage(acount) {
        console.log(acount)
        this.currentPage = acount
      },
      btnClick(aIndex) {
        switch (aIndex) {
          case 1:
            this.currentPage = 1;
            break
          case 2:
            this.currentPage > 1 && this.currentPage--;
            break
          case 3:
            this.currentPage < this.maxPage && this.currentPage++;
            break
          case 4:
            this.currentPage = this.maxPage;
            break
        }
      }
    }
  }
</script>