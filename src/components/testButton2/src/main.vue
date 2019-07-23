
<template>
<div>
  <el-input v-bind="$attrs"
            v-on="$listeners">
  </el-input>
</div>
</template>

<script>
export default {
  name: 'wanhuabutton2',
  mounted () {
      //new code
    console.log("JFJFJFFJFJJFFJJFFJFJ")
    setTimeout(() => {
      
    }, 1000)
  }
};
</script>

<style>
.el-input__inner {
  background-color: #f00;
  border-color: #0f0;
}
</style>
>
