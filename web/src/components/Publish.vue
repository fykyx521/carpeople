<template>
	<div>
		<div class="weui-navbar">
			<div class="weui-navbar__item">
				信息发布
			</div>
		</div>
		<div class="weui-tab__panel">

        </div>
		<div class="weui-cells weui-cells_form">
			<div class="weui-cells__title">出行模式</div>
			
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
						<option value="1">今天</option>
						<option value="2">明天</option>
						<option value="3">后天</option>
					</select>
				</div>
			</div>
			<div class="weui-cell weui-cell_select weui-cell_select-after">
				<div class="weui-cell__hd">
					<label for="" class="weui-label">出发时间</label>
				</div>
				<div class="weui-cell__bd">
					<select class="weui-select" name="select5" v-model="starttime">
						<option value="5">5点</option>
						<option value="6">6点</option>
						<option value="7">7点</option>
						<option value="8">8点</option>
						<option value="9">9点</option>
						<option value="10">10点</option>
						<option value="11">11点</option>
						<option value="12">12点</option>
						<option value="13">下午1点</option>
						<option value="14">下午2点</option>
						<option value="15">下午3点</option>
						<option value="16">下午4点</option>
						<option value="17">下午5点</option>
						<option value="18">下午6点</option>
						<option value="19">下午7点</option>
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
					</select>
				</div>
			</div>
			<div class="weui-cell weui-cell_select weui-cell_select-after">
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
			</div>
			
			<button class="weui-btn weui-btn_primary" @click='publish'>确认发布</button>
		</div>
	</div>  
</template>

<script>
	export default {
		name:'publish',
		data ()
		{
			return {
				cptype:0,
				from:141124,
				to:140100,
				peoplenum:1,
				unitprice:0,
				startdate:1,
				starttime:12,
			}

		},
		methods:{
			publish ()
			{
				var currentUser = Bmob.User.current();
				var CarPeople = Bmob.Object.extend("icp");
    			var cp = new CarPeople();
    			cp.set("cptype",Number(this.cptype));
    			cp.set('from',Number(this.from));
    			cp.set('to',Number(this.to));
    			cp.set('startdate',new Date());
    			cp.set('starttime',Number(this.starttime));
    			cp.set('peoplenum',Number(this.peoplenum));
    			cp.set('unitprice',Number(this.unitprice));
    			if(currentUser){
    				cp.set('parent',currentUser);
    				cp.set('phone',Number(currentUser.get('mobilePhoneNumber')));
    			}
    			cp.save().then(()=>{
    				this.$router.push({name:'peoplecar'})
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



