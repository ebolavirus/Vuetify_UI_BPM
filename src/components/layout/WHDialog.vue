<template>
    <v-dialog :fullscreen="!this.$vuetify.breakpoint.smAndUp" v-bind="$attrs" v-on="$listeners" :inheritAttrs="false" >
        <v-toolbar v-if="!this.$vuetify.breakpoint.smAndUp" dark color="primary">
            <v-btn icon dark @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <slot></slot>
    </v-dialog>
</template>
<script>
  export default {
    name: 'wh-dialog',
      methods:{
        close(){
            this.$emit('input',false)
        }
      }
  };
</script>