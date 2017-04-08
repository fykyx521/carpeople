<template>
	
	<div class="weui-panel" style="margin-top:0px;">
            
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text" v-for="item in list">
                    <div class="weui-media-box__title weui-flex">
                    	<div class="weui-flex__item">{{btitle(item)}}</div>
                    	<div class="weui-flex__item" style="text-align:center;">{{item.get('starttime')}}点走</div>
                    	<div class="weui-flex__item"><a href='tel:15513855060' style="float:right" class="weui-btn weui-btn_mini weui-btn_plain-primary">点击拨打</a></div>
                    	 
                    </div>
                    <!-- <p class="weui-media-box__desc">价格:{{item.get('unitprice')}}</p> -->
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta">临县到太原</li>
                        <li class="weui-media-box__info__meta" style="float:right">发布于:{{pubtime(item)}}</li>
                        
                    </ul>
                </div>
            </div>
      </div>

</template>

<script>
	
	export default {
		name:'cplist',
		props:{cptype:Number},
		data ()
		{
			return {list:[]}
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
				query.equalTo("cptype", this.cptype);
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
			},
			btitle (item)
			{
				if(this.cptype==1)
				{
					return '车找'+item.get('peoplenum')+'人';
				}
				return item.get('peoplenum')+"人找车";
			}
		}
	}
</script>

