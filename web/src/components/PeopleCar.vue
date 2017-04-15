<template>
	<div>
		<top></top>
		<div class="weui-tab__panel">

        </div>
		 <cplist :cptype="cptype"></cplist>
  		
	</div>
</template>
<script>

	 import top from './Top.vue';
	import cplist from './item/Cplist';
	export default {
		name:'carpeople',
		components:{cplist,top},
		data ()
		{
			return {list:[],cptype:0}
		},
		created()
		{
			
		},
		methods:{
			
		}
	}
</script>
<style>
	 .addrselect{
	 	margin-top: 0px;
	 }
	.weui-cell .addr{
		text-align: center;
	}
</style>