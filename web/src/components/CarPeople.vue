<template>
	<div>
		<div class="weui-navbar" style="position:fixed;">
			<div class="weui-navbar__item weui_bar__item_on">
				车找人
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
			return {list:[],cptype:1}
		},
		created()
		{
			this.load();
		},
		methods:{
			load ()
			{
				var ICP = Bmob.Object.extend("icp");
				var query = new Bmob.Query(ICP);
				query.equalTo("cptype", 1);
				query.find().then(results=>{
					this.list=results;
				});
// 查询所有数据
			},
			pubtime(item)
			{
				// console.dir(item.updatedAt);
				var str =item.updatedAt; 
				str = str.replace(/-/g,"/"); 
				var date = new Date(str );
				let updatedAt=date.getTime();
				return this.dateDiff(updatedAt);
				// return moment(item.createdAt,'YYYY-MM-DD hh:mm:ss').startOf('hour').fromNow();
			}
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