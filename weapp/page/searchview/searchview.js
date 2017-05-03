import Bmob from '../../utils/bmob';
import { dateDiff } from '../../utils/cputil';
var sliderWidth = 96; 
const mapdata={
		'141124':'临县',
		'140100':'太原',
		'141102':'离石'
	};
Page({
	data: {
		list: [],
		nodata: false,
		loading:false,
		fromaddr: 140100,
		toaddr: 141124,
		cptype: 1,
		nodatatxt: "没有更多数据了",
		tabs: ["车找人", "人找车"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
	},
	cpfrom(item) {
		// console.dir(item);
		return (item.get('datafrom')) == 1 ? 'qq群' : '公众号ii0358';
	},
	cdate(item) {
		return '123';
	},
	onReady() {
		console.log('ready go');
	},
	tabClick (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
			cptype:e.currentTarget.id==1?0:1
        });
		this.load();
    },
	getTitle()
	{
		return mapdata[this.data.fromaddr]+'到'+mapdata[this.data.toaddr];
	},
	load()
	{
		var ICP = Bmob.Object.extend("icp");
		var query = new Bmob.Query(ICP);
		var startdate = new Date();
		// var hours=startdate.getHours();
		// startdate.setHours(0);	
		startdate.setMinutes(0);
		startdate.setSeconds(0);
		// query.greaterThanOrEqualTo("startDate",startdate);
		query.equalTo('from', Number(this.data.fromaddr));
		query.equalTo('to', Number(this.data.toaddr));
		query.limit(100);
		query.equalTo("cptype", this.data.cptype);
		query.greaterThanOrEqualTo('startdate', startdate);
		query.ascending("startdate");
		query.descending("updatedAt");
		this.showloading();
		query.find().then(results => {
			this.loading = false;
			let map = {};
			let results2 = [];
			results.forEach(function (item, index) {
				let starttime = item.get('starttime');
				let date=new Date();
				date.setTime(starttime);
				item.set('startdt', date.getHours() + '点走');
				item.set('datediff', dateDiff(Date.now(), starttime));
				return item;
			});

			this.setData({
				list: results
			});
			if(results.length==0)
			{
				this.setData({nodata:true});
			}

			this.hideloading();
			

		});
	},
	showloading()
	{
		wx.showNavigationBarLoading();
		this.setData({loading:true});
	},
	hideloading()
	{
		wx.hideNavigationBarLoading();
		this.setData({loading:false});
	},
	onLoad(option) {
		 var that = this;
         wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
		// console.log(option);
		let fromaddr=option.fromaddr
		let toaddr=option.toaddr;
		let cptype=option.cptype?option.cptype:1;
		this.setData({
			fromaddr:fromaddr,
			toaddr,toaddr
		});
		wx.setNavigationBarTitle({
		  title: this.getTitle(),
		  success: function(res) {
			// success
		  }
		});

		this.load();
		
	}


});