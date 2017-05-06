<template>
	<div>
		<div class="weui-navbar">
			
			<div class="weui-navbar__item weui-flex">
				<div class="weui-flex__item" @click='back'>< 返回</div>
				<div class="weui-flex__item">拼车信息发布</div>
				<div class="weui-flex__item"></div>
			</div>
			
		</div>
		<div class="weui-tab__panel">

        </div>
		<div class="weui-cells weui-cells_form">
			<div class="weui-cells__title">出行模式</div>
			<div class="weui-cell weui-cell_warn">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="[0-9]*" v-model='tel' placeholder="请输入手机号">
                </div>
            </div>
			<div class="weui-cells weui-cells_radio"> 
				<label class="weui-cell weui-check__label" for="x11"> 
					<div class="weui-cell__bd"> 
						<p>车找人</p> 
					</div>
					<div class="weui-cell__ft"> 
						<input type="radio" class="weui-check" name="radio1" id="x11" value="1" v-model="cptype">
						<span class="weui-icon-checked"></span>
					</div>
				</label>
				<label class="weui-cell weui-check__label" for="x12">

					<div class="weui-cell__bd">
						<p>人找车</p>
					</div>
					<div class="weui-cell__ft">
						<input type="radio" name="radio1" class="weui-check" id="x12" value="0" v-model="cptype">
						<span class="weui-icon-checked"></span>
					</div>
				</label>
				
			</div>

			<div class="weui-cells__title">选择出发地和目的地</div>
			<div class="weui-cells">
			
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

			</div>
			
			
			
			<div class="weui-cells__title">选择出发日期和出发时间</div>
			<div class="weui-cell weui-cell_select weui-cell_select-after">
				<div class="weui-cell__hd">
					<label for="" class="weui-label">出发日期</label>
				</div>
				<div class="weui-cell__bd">
					<select class="weui-select" name="select4" v-model="startdate">
						<option v-for="item,key in startdateoption" :value="item.value">{{item.key}}</option>
						
					</select>
				</div>
			</div>
			<div class="weui-cell weui-cell_select weui-cell_select-after">
				<div class="weui-cell__hd">
					<label for="" class="weui-label">出发时间</label>
				</div>
				<div class="weui-cell__bd">
					<select class="weui-select" name="select5" v-model="starttime">
						<option v-for="item in starttimeoption" :value="item">{{item}}点</option>
					</select>
				</div>
			</div>

			<div class="weui-cell weui-cell_select weui-cell_select-after">
				<div class="weui-cell__hd">
					<label for="" class="weui-label">人数</label>
				</div>
				<div class="weui-cell__bd">
					<select class="weui-select" name="select6" v-model="peoplenum">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
				</div>
			</div>
			<!-- <div class="weui-cell weui-cell_select weui-cell_select-after">
				<div class="weui-cell__hd">
					<label for="" class="weui-label">价格(每人)</label>
				</div>
				<div class="weui-cell__bd">
					<select class="weui-select" name="select7" v-model="unitprice">
						<option value="0">电话沟通</option>
						<option value="30">30</option>
						<option value="40">40</option>
						<option value="50">50</option>
						<option value="60">60</option>
						<option value="70">70</option>
					</select>
				</div>
			</div> -->
			
			<button class="weui-btn weui-btn_primary" @click='publish'>确认发布</button>
		</div>
	</div>  
</template>

<script>
	// import moment from 'moment';
	export default {
		name:'publish',
		data ()
		{
			return {
				cptype:0,
				from:141124,
				to:140100,
				tel:'',
				peoplenum:1,
				unitprice:0,
				startdate:1,
				starttime:12,
			}
		},
		computed:{
			 startdateoption()
			 {
			 	 
			 	   let hour=new Date().getHours();
			 	  if(hour>=19)
			 	  {
			 	  	  this.startdate=2;
			 	  	  return [{key:"明天",value:2},{key:"后天",value:3}];
			 	  }
			 	  this.startdate=1;
			 	  return  [{key:"今天",value:1},{key:'明天',value:2},{key:'后天',value:3}];
			 },
			 starttimeoption ()
			 {
			 	 let hour=new Date().getHours();
			 	 
			 	 let starthour=hour;
			 	 if(this.startdate>1)
			 	 {
			 	 	 starthour=5;	
			 	 }
			 	 console.log(hour);
			 	 this.starttime=starthour;
			 	 let end=19;
			 	 let options=[];
			 	 for(var i=starthour;i<=end;i++)
			 	 {
			 	 	 options.push(i);
			 	 }
			 	 return options;
			 }
		},
		methods:{
			back()
			{
				this.$router.push({name:'searchview'});
			},
			valid ()
			{
				if(this.tel=='')
                {
                    this.topTips('电话号码不能为空',1500);
                    return false;
                }
                let reg=/^1[3|4|5|8|7][0-9]\d{4,8}$/;
                if(!reg.test(this.tel.toString()))
                {
                    this.topTips('电话号码格式不正确',1500);
                    return false;
                }
                return true;
			},
			topTips (msg)
			{
				 alert(msg);
			},
			publish ()
			{
				if(!this.valid())
				{
					return;
				}
				var currentUser = Bmob.User.current();
				var CarPeople = Bmob.Object.extend("icp");
    			var cp = new CarPeople();
    			cp.set("cptype",Number(this.cptype));
    			cp.set('from',Number(this.from));
    			cp.set('to',Number(this.to));
    			cp.set('datafrom',2);
    			let startdate=new Date();
    			startdate.setMinutes(0);
    			startdate.setSeconds(0);
    			startdate.setHours(this.starttime);
    			console.log(startdate);
    			// let startdate=moment().hour(this.starttime).minute(0).second(0).toDate();
    			cp.set('startdate',startdate);
    			cp.set('starttime',startdate.getTime());
    			cp.set('peoplenum',Number(this.peoplenum));
    			cp.set('unitprice',Number(this.unitprice));
    			// if(currentUser){
    			// 	cp.set('parent',currentUser);
    			cp.set('phone',Number(this.tel));
    			// }
    			cp.save().then(()=>{
    				this.$router.push({name:'searchview',params:{from:this.from,to:this.to}})
    				console.log('添加成功');
    			},error=>{
    				console.log(error);
    			})
			}
		}
	}
</script>
<style scoped>
	.weui-cells{
		margin-top: 0px;
	}
</style>



