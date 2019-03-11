<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "pages/css/base.css";
  html,body{
    height: 100%;
  }
  #app{
    height: 100%;
  }
  #editorElem .w-e-menu{
    z-index: 1!important;
  }
  .el-select-dropdown__item{
    z-index: 10002;
  }
  .w-e-text-container{
    z-index: 1!important;
  }
</style>
