<template>
  <div style='width:240px; height: 365px; max-height: 365px;overflow: auto' v-if='treeJson.length>0'>
    <el-tree
      ref="sabereltree"
      :data="treeJson"
      :props="treeProps"
      :filter-node-method="filtNode"
      @node-click="nodeClick"
    />
  </div>
</template>

<script>
export default {
  name: 'bpmcorepersontree',
  model: {
    prop: 'selectItem',
    event: 'itemChanged'
  },
  props: {
    selectItem: {},
    treeJson: {},
    filterText: ''
  },
  data () {
    return {
      treeProps: {
        children: 'children',
        label: 'name'
      },
      dataList: []
    }
  },
  watch: {
    filterText (to) {
      this.$refs.sabereltree.filter(to)
    }
  },
  methods: {
    filtNode (v, data) {
      if (!v) {
        return true
      }
      return data.name.indexOf(v) !== -1
    },
    // 点击节点
    nodeClick: function (m) {
      // console.log('i\'s id :::', m)
      this.$emit('itemChanged', m)
    }
  }
}
</script>
<style scoped>
  /*body {*/
    /*font-family: Helvetica, sans-serif;*/
  /*}*/
  /*.operate ul>li{*/
    /*float:left;*/
    /*margin:10px 10px;*/
    /*list-style-type: none;*/
  /*}*/
</style>
