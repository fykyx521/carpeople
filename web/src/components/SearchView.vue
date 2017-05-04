<template>
	<div v-infinite-scroll="load" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		
		<div class="weui-tab">
				<div class="weui-navbar" style="position:fixed;top:0;">
					<div class="weui-navbar__item weui-flex">
						<div class="weui-flex__item">
								<router-link  class='weui-btn weui-btn_mini weui-btn_default' :to="{name:'search'}">重新选择</router-link>
						</div>
						<div class="weui-flex__item">
							{{title}}
						</div>
						<div class="weui-flex__item">
							<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" @click='publish'>发布</a>
						</div>

					</div>
				</div>
			<div class="weui-tab__panel">

			</div>
		</div>
		<div class="weui-tab">
				<div class="weui-navbar" style="position:fixed;top:50px;">
					<div class="weui-navbar__item" @click="settype(1)" :class="[cptype==1?'weui-bar__item_on':'']">
						车找人
					</div>
					<div class="weui-navbar__item" @click="settype(0)" :class="[cptype==0?'weui-bar__item_on':'']">
						人找车
					</div>
				</div>
			<div class="weui-tab__panel">
				<template v-for="item in list" >
					<div class="weui-panel weui-panel_access">
						<div class="weui-panel__bd">
							<div class="weui-media-box weui-media-box_text">
								<div class="weui-flex weui-media-box__title" >
									<div class="weui-flex__item">{{start(item)}}</div>
									<div class="weui-flex__item" style="text-align:center;">人数:{{item.get('peoplenum')}}</div>
									<div class="weui-flex__item" style="text-align:right;"><a :href="telhref(item)"><img src="../assets/phone.png" style="width:32px;height:32px;" /></a></div>
								</div>
								<p class="weui-media-box__desc">{{pubtext(item)}}</p>
								<ul class="weui-media-box__info">
									<li class="weui-media-box__info__meta">来源:{{datafrom(item)}}</li>
									<li class="weui-media-box__info__meta">发布时间:{{pubtime(item)}}</li>
									<li class="weui-media-box__info__meta weui-media-box__info__meta_extra">人数:{{item.get('peoplenum')}}</li>
								</ul>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
		
		
		<div class="weui-loadmore" v-show='loading'>
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-show='nodata'>
            <span class="weui-loadmore__tips">{{nodatatxt}}</span>
        </div>
        <div style="height:80px;">
        	
        </div>
        <div  class="weui-btn weui-btn_primary" @click='publish' style="position:fixed;bottom:0px;width:100%;">
                    发布拼车信息
         </div>

	</div>	
	
</template>
<script>
	// import moment from 'moment';
	// moment.locale('zh-cn'); 
	const mapdata={
		'141124':'临县',
		'140100':'太原',
		'141102':'离石'
	};
	export default{
		name:'sview',
		data ()
		{
			return {
				cptype:1,
				from:140100,
				to:141124,
				list:[],
				loading:true,
				nodata:false,
				limit:15,
				skip:0,
				currentpage:0,
				hasmore:true,
			}
		},
		created()
		{
			let fromp=this.$route.query.from;
			let to=this.$route.query.to;
			let  cptype=this.$route.query.cptype;
			if(fromp)
			{
				this.from=Number(fromp);
			}
			if(to)
			{
				this.to=Number(to);
			}
			if(cptype)
			{
				this.cptype=parseInt(cptype);
			}

			// console.log(this.from+":"+this.to);
			this.load();
		},
		computed:{
			title ()
			{
				let cpstr=this.cptype==1?'车找人':'人找车';
				return mapdata[this.from]+'到'+mapdata[this.to];
			},
			nodatatxt()
			{
				return "暂无更多"+mapdata[this.from]+'到'+mapdata[this.to]+'的记录,过一会再来查';
			}

		},
		watch:{
			cptype:'cptypechange'
		},
		methods:{
			publish()
			{
				this.$router.push({name:'publish',query:{from:this.from,to:this.to}});
			},
			start(item)
			{
				
				let date=item.get('startdate');
				let startdate=new Date(Date.parse(date.replace(/-/g, "/")));

				// console.log(date.toString());
				return this.dateAfter(startdate);//startdate.getHours()+"点走";//moment(date).calendar();
			},
			pubtime(item)
			{
				let date=item.updatedAt;
				// console.dir(date);
				// let date2=Date.parse(date);
				// console.log(date);
				// alert(date);
				// return this.diff(date2.getTime());
				let pubdate=new Date(Date.parse(item.updatedAt.replace(/-/g, "/")));
				return this.dateDiff(pubdate.getTime());
				// return moment(date).fromNow();
			},
			pubtext(item)
			{
				let txt=this.cptype?'[车找人]':'[人找车]';
				txt+=mapdata[this.from]+'到'+mapdata[this.to];
				
				let qqtext=item.get('qqtext')+"";
				let startdate=new Date(Date.parse(item.get('startdate').replace(/-/g, "/")));
				if(this.isToday(startdate))
				{
					qqtext=qqtext.replace('明天','');
					qqtext=qqtext.replace('明','');
					
				}
				return item.get('datafrom')==1?qqtext:txt;

			},
			datafrom(item)
			{
				if(item.get('datafrom')==1)
				{
					return 'QQ群';
				}
				return '公众号ii0358';
			},
			telhref(item)
			{
				return "tel:"+item.get('phone');
			},
			cptypechange()
			{
				this.load(true)
			},
			load(clear=false)
			{
				if(clear)
				{
					this.skip=0;
					this.list=[];
					this.hasmore=true;
				}
				if(!this.hasmore)
				{
					return;
				}

				this.loading=true;
				this.nodata=false;
				var ICP = Bmob.Object.extend("icp");
				var query = new Bmob.Query(ICP);
				var startdate=new Date();
				// var hours=startdate.getHours();
				startdate.setHours(startdate.getHours()-1);	
				startdate.setMinutes(0);
				startdate.setSeconds(0);
				// query.greaterThanOrEqualTo("startDate",startdate);
				query.equalTo('from',this.from);
				query.equalTo('to',this.to);
				query.limit(this.limit);
				query.skip(this.skip);
				query.equalTo("cptype", this.cptype);
				query.greaterThanOrEqualTo('startdate',startdate);
				query.ascending("startdate");
				query.descending("updatedAt");
				query.find().then(results2=>{

					this.loading=false;
					if(results2.length>0)
					{
						results2.forEach(item=>{
							this.list.push(item);
						});
						this.skip=this.list.length;
					}else{
						this.nodata=true;
						this.hasmore=false;
					}
					
					
				});
				query.cout
			},
			settype(type)
			{
				this.cptype=type;
			},
		}
		
	}
</script>