<template>
  <div class="v-input v-input--is-label-active v-text-field" :label="label">
    <div class="v-input__slot" style="margin-bottom:13px">
      <div class="v-text-field__slot">
        <label for="input-907" class="v-label v-label--active theme--light whtexttitle">{{label}}</label>
        <!-- <input id="input-907" type="text"> -->
        <a :href="href" target="_blank">{{showlabel}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wh-hyperlink',
    props: {
      href: {
        type: String,
        default () {
          return ''
        }
      },
      label: {
        type: String,
        default () {
          return ''
        }
      },
      value: {
        type: String,
        default () {
          return ''
        }
      }
    },
    computed: {
      showlabel() {
        if (this.value && this.value.length > 0) {
          return this.value
        }
        return this.href
      }
    }
  }
</script>