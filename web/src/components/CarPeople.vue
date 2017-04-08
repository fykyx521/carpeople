<template>
	<div class="weui-tab">
		<div class="weui-navbar">

			<div class="weui-navbar__item weui_bar__item_on">
				车找人
			</div>
			
		</div>
		<div class="weui-tab__bd">
			<div class="weui-panel">
            <div class="weui-panel__hd">文字列表附来源</div>
            <div class="weui-panel__bd" v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <div class="weui-media-box weui-media-box_text" v-for="item in list">
                    <h4 class="weui-media-box__title">
                    	车找{{item.get('peoplenum')}}人 电话:<button style="display:inline-block; width:100px;" class="weui-btn weui-btn_mini weui-btn_plain-primary">点击拨打</button>
                    </h4>
                    <!-- <p class="weui-media-box__desc">价格:{{item.get('unitprice')}}</p> -->
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta">发布来源:wap</li>
                        <li class="weui-media-box__info__meta">发布时间:{{pubtime(item)}}</li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
                    </ul>
                </div>
            </div>
        	</div>
        </div>
		
		
  		
	</div>
</template>
<script>
	import moment from 'moment';
	export default {
		name:'carpeople',
		data ()
		{
			return {list:[],busy:true}
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
				this.busy = true;
				query.find().then(results=>{
					results.forEach(item=>this.list.push(item));
					// this.list=results;
					this.busy=false;
					console.log(results);
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