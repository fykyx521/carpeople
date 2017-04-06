<template>
<div>
	<div class="weui-navbar">
  		 <div class="weui-navbar__item weui_bar__item_on">
    		  信息发布
  		</div>
	</div>
	<div class="weui-cells weui-cells_form">
	<div class="weui-cells__title">模式选择</div>
	<div class="weui-cells weui-cells_radio">
            <label class="weui-cell weui-check__label" for="x11">
                <div class="weui-cell__bd">
                    <p>车找人</p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" name="radio1" id="x11" v-model="cptype">
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="x12">

                <div class="weui-cell__bd">
                    <p>人找车</p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" name="radio1" class="weui-check" id="x12" checked="checked" v-model="cptype">
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
           
        </div>

        <div class="weui-cells__title">选择出发地和目的地</div>
       <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">出发地</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2" v-mode="from">
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

        <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">人数</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="[1-3]" v-model="peoplenum"
                     value="1" max="3" min="1">
                </div>
         </div>
	
 
  
  <div class="weui-cell">
    <div class="weui-cell__hd"><label for="" class="weui-label">出发时间</label></div>
    <div class="weui-cell__bd">
      <input class="weui-input" type="datetime-local" value="" placeholder="" v-model='startdatetime'>
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
				startdatetime: new Date(),

			}

		},
		methods:{
			publish ()
			{
				alert(this.startdatetime);
			}
		}
	}
</script>