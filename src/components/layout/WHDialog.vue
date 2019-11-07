<template>
    <v-dialog :fullscreen="!$vuetify.breakpoint.smAndUp" v-bind="$attrs" v-on="$listeners" :inheritAttrs="false" >
        <v-toolbar v-if="$vuetify.breakpoint.smAndUp?isShowHeader:true" dark color="primary">
            <v-btn icon dark @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="title">{{title}}</v-toolbar-title>
        </v-toolbar>
        <slot></slot>
    </v-dialog>
</template>
<script>
  export default {
      name: 'wh-dialog',
      props:{
          title: {
              type: String,
              default: ''
          },
          isShowHeader: {
              type: Boolean,
              default: false
          }
      },
      methods:{
        close(){
            this.$emit('input',false)
        }
      }
  };
</script>