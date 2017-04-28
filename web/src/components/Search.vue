<template>
<div>
	<h1 class="demos-title">拼车搜索</h1>
	<div class="weui-cells__title">选择出发地和目的地</div>
	<div class="weui-cells weui-cells_form" >
		
				<div class="weui-cell weui-cell_select weui-cell_select-after">
				<div class="weui-cell__hd">
					<label for="" class="weui-label">出发地</label>
				</div>
				<div class="weui-cell__bd">
					<select class="weui-select" name="select2" v-model="from">
						<option value="141124">临县</option>
						<option value="140100">太原</option>
						<option value="141102">离石</option>
					</select>
				</div>
			</div>


			<div class="weui-cell weui-cell_select weui-cell_select-after">
				<div class="weui-cell__hd">
					<label for="" class="weui-label">目的地</label>
				</div>
				<div class="weui-cell__bd">
					<select class="weui-select" name="select3" v-model="to">
						<option value="141124">临县</option>
						<option value="140100">太原</option>
						<option value="141102">离石</option>
					</select>
				</div>
			</div>
		
		<div class="weui-cells">
			<input type="button" name="" class="weui-btn weui-btn_primary" @click="search()" value="搜索拼车信息">
			<!-- <router-link type="button" name=""  :to="{name:'searchview',params:{from:from,to:to}}">搜索</router-link> -->
		</div>
	</div>	
</div>	
</template>
<script>
	export default {
		name:"search",
		data ()
		{
			return {from:141124,to:140100}
		},
		methods:{
			search()
			{
				if(this.from==this.to)
				{
					alert("出发地和目的地不能一样");
					return;
				}
				this.$router.push({name:'searchview',params:{from:this.from,to:this.to}});
			}
		}
	}
</script>
<style scoped>
	.demos-title {
    text-align: center;
    font-size: 34px;
    color: #3cc51f;
    font-weight: 400;
    margin: 15% 15%;
}
</style>