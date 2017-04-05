<template>
  <div id="app">
    <router-view></router-view>
   
    <appfooter></appfooter>
  </div>
</template>

<script>
import appfooter from '@/components/Footer.vue'
export default {
  name: 'app',
  components:{appfooter}
}
</script>

<style>
#app {
   height: 100%;
}
</style>
