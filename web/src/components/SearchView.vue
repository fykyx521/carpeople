<template>
	 <div class="weui-tab">
            <div class="weui-navbar">
                <div class="weui-navbar__item" :class="[cptype==1?'weui-bar__item_on':'']" @click="settype(1)">
                    车找人
                </div>
                <div class="weui-navbar__item" :class="[cptype==0?'weui-bar__item_on':'']" @click="settype(0)">
                    人找车
                </div>
            </div>
            <div class="weui-tab__panel">
            	<template v-for="item in list">
            		<div class="weui-panel weui-panel_access">
            			<div class="weui-panel__bd">
            				<div class="weui-media-box weui-media-box_text">
            					<h4 class="weui-media-box__title">{{item.get('starttime')}}点走</h4>
            					<p class="weui-media-box__desc">{{item.get('qqtext')}}</p>
            				</div>
            			</div>
            		</div>
            	</template>
	        </div>
        </div>
</template>
<script>
	export default{
		name:'sview',
		data ()
		{
			return {
				cptype:1,
				list:[],
			}
		},
		created()
		{
			this.load();
		},
		watch:{
			cptype:'load'
		},
		methods:{
			load()
			{
				var ICP = Bmob.Object.extend("icp");
				var query = new Bmob.Query(ICP);
				var startdate=new Date();
				var hours=startdate.getHours();
				startdate.setHours(0);	
				startdate.setMinutes(0);
				startdate.setSeconds(0);
				// query.greaterThanOrEqualTo("startDate",startdate);
				query.equalTo("cptype", this.cptype);
				query.greaterThanOrEqualTo('starttime',hours);
				query.ascending("starttime");
				query.descending("updatedAt");
				query.find().then(results=>{
					this.list=results;
					
				});
			},
			settype(type)
			{
				this.cptype=type;
			},
		},
		computed:{
			tabclass ()
			{
			}
		}
	}
</script>