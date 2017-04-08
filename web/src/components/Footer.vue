<template>

  

	 <div class="weui-tabbar" style="position:fixed;">
   
    <router-link :to="{name:'carpeople'}" class="weui-tabbar__item weui-bar__item--on">
      <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;">8</span>
      <div class="weui-tabbar__icon">
        <img src="../assets/tab/car.png" alt="" width="32" height="32">
      </div>
      <p class="weui-tabbar__label">车找人</p>
    </router-link>

    <router-link :to="{name:'peoplecar'}" class="weui-tabbar__item">
      <div class="weui-tabbar__icon">
        <img src="../assets/tab/people.png" alt="" width="32" height="32">
      </div>
      <p class="weui-tabbar__label">人找车</p>
    </router-link>

    <router-link :to="{name:'publish'}" class="weui-tabbar__item">
      <div class="weui-tabbar__icon">
        <img src="../assets/tab/publish.png" alt="" width="32" height="32">
      </div>
      <p class="weui-tabbar__label">发布</p>
    </router-link>

    <router-link :to="{name:'my'}" class="weui-tabbar__item">
      <div class="weui-tabbar__icon">
       <img src="../assets/tab/people.png" alt="" width="32" height="32">
      </div>
      <p class="weui-tabbar__label">我</p>
    </router-link>

 
</div>
</template>
<script>
	export default {
		name:'appfooter',
    methods ()
    {

    }
	}
</script>
<style scoped>
   .router-link-active .weui-tabbar__label{
      color: #09bb07;
   }
</style>