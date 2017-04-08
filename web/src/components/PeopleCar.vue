<template>
	<div>
		<div class="weui-navbar" style="position:fixed;">
			<div class="weui-navbar__item weui_bar__item_on">
				人找车
			</div>
		</div>
		<div class="weui-tab__panel">

        </div>
		 <cplist :cptype="cptype"></cplist>
  		
	</div>
</template>
<script>
	import cplist from './item/Cplist';
	export default {
		name:'carpeople',
		components:{cplist},
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