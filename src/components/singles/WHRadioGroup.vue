<template>
  <div class="v-input v-input--is-label-active v-text-field" :label="label">
    <div class="v-input__slot">
      <div class="v-text-field__slot">
        <label for="input-907" class="v-label v-label--active theme--light"
          style="left: 0px; right: auto; position: absolute;">{{label}}</label>
        <v-radio-group :row="$vuetify.breakpoint.smAndUp" v-bind="$attrs" v-on="$listeners" :inheritAttrs="false">
          <slot />
        </v-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wh-radio-group',
    props: {
      label: ''
    }
  }
</script>