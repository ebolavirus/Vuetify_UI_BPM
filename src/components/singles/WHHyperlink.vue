<template>
  <a :href="href" target="_blank">{{showlabel}}</a>
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
      }
    },
    computed: {
      showlabel() {
        if (this.label && this.label.length > 0) {
          return this.label
        }
        return this.href
      }
    }
  }
</script>