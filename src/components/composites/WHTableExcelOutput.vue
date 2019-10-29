<template>
  <span>
    <v-overlay :value="loading">
       <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <wh-btn :style="btnStyle" color="primary" dark @click="click">
      <slot></slot>
    </wh-btn>
  </span>
</template>

<script>
  export default {
    name: 'wh-table-excel-output',
    props: {
      btnStyle:{},
      tableHeader: {
        type: Array,
        default() {
          return []
        }
      },
      tableData: {
        type: Array,
        default() {
          return []
        }
      },
      autoWidth: {
        type: Boolean,
        default: true
      },
      bookType:  {
        type: String,
        default: 'xlsx'
      }
    },
    data(){
      return {
        loading: false
      }
    },
    methods:{
      click(){
        if(!this.tableData||!this.tableData.length||this.tableData.length===0){
          this.$emit('onFail','empty')
          return
        }
        this.loading = true
        import('@/js/ExcelOutput').then(excel => {
          excel.export_json_to_excel({
            header: this.tableHeader.map(v=>{return v.text}),
            data:this.tableData.map(v => this.tableHeader.map(v=>{return v.value}).map(j => {return v[j]})),
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.loading = false
        })
      }
    }
  };
</script>