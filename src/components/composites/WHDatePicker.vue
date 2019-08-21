<template>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="TESTdate"
        persistent
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="TESTdate"
            :label="label"
            append-icon="mdi-event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="TESTdate" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">取消</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(TESTdate)">确定</v-btn>
        </v-date-picker>
      </v-dialog>
</template>
<script>
  export default {
    name:'wh-date-picker',
    model: {
      prop: 'date',
      event: 'whdateChanged'
    },
    data: () => ({
      TESTdate: this.date,
      menu: false,
      modal: false
    }),
    props:{
      label: "",
      date: String
    },
    watch:{
      TESTdate (to, from) {
        this.$emit('whdateChanged', to)
      },
    }
  }
</script>