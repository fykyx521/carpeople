import Bmob from '../../utils/bmob';
import { dateDiff, dateAfter, isToday } from '../../utils/cputil';
var sliderWidth = 96;
let skip=0;
let hasmore=true;
const mapdata = {
	'141124': '临县',
	'140100': '太原',
	'141102': '离石'
};
Page({
	data: {
		list: [],
		nodata: false,
		loading: false,
		fromaddr: 140100,
		toaddr: 141124,
		cptype: 1,
		nodatatxt: "没有更多数据了",
		tabs: ["车找人", "人找车"],
		activeIndex: 0,
		sliderOffset: 0,
		sliderLeft: 0,
		scrollHeight:0
	},
	cpfrom(item) {
		// console.dir(item);
		return (item.get('datafrom')) == 1 ? 'qq群' : '公众号ii0358';
	},

	onReady() {
		console.log('ready go');
	},
	phoneclick(e) {
		let phone = e.currentTarget.dataset.phone;
		// console.log(phone);
		wx.makePhoneCall({
			phoneNumber: phone + '',
			success: function (res) {
				
			}
		})
	},
	tabClick(e) {
		this.setData({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id,
			cptype: e.currentTarget.id == 1 ? 0 : 1
		});
		this.reload();
	},
	getTitle() {
		return mapdata[this.data.fromaddr] + '到' + mapdata[this.data.toaddr];
	},
	pubtext(item) {
		let txt = this.data.cptype ? '[车找人]' : '[人找车]';
		txt += this.getTitle();

		let qqtext = item.get('qqtext') + "";
		let startdate = new Date(Date.parse(item.get('startdate').replace(/-/g, "/")));
		if (isToday(startdate)) {
			qqtext = qqtext.replace('明天', '');
			qqtext = qqtext.replace('明', '');

		}
		return item.get('datafrom') == 1 ? qqtext : txt;

	},
	onReachBottom: function() {
    	this.load();
  	},
	reload(){
		skip=0;
		hasmore=true;
		this.setData({list:[]});
		this.load();
	},
	checknodata(results)
	{
		if (results.length == 0) {
				hasmore=false;
				this.setData({ nodata: true });
		}
		let nodatatxt= "暂无更多数据,过一会再来或者点击底部发布一条拼车信息让别人联系你";
		this.setData({
			nodatatxt:nodatatxt
		});
	},
	load() {
		if(!hasmore)
		{
			return;
		}
		if(this.data.loading)
		{
			console.log('loading');
			return;
		}
		this.showloading();
		let that = this;
		var ICP = Bmob.Object.extend("icp");
		var query = new Bmob.Query(ICP);
		var startdate = new Date();
		// var hours=startdate.getHours();
		// startdate.setHours(0);	
		// startdate.setHours(-1);
		console.log(startdate);
		startdate.setHours(startdate.getHours()-1);
		startdate.setMinutes(0);
		startdate.setSeconds(0);
		
		query.equalTo('from', Number(this.data.fromaddr));
		query.equalTo('to', Number(this.data.toaddr));
		query.limit(5);
		query.skip(skip);
		query.equalTo("cptype", this.data.cptype);
		query.greaterThanOrEqualTo('startdate', startdate);
		query.ascending("startdate");
		query.descending("updatedAt");
		
		let nlist=this.data.list;
		
		query.find().then(results => {
			results.forEach(function (item, index) {
				let starttime = item.get('starttime');
				let date = new Date();
				date.setTime(starttime);
				item.set('startdt', dateAfter(date));
				let pubdate = new Date(Date.parse(item.updatedAt.replace(/-/g, "/")))
				// console.log('pubdate'+item.updatedAt);
				item.set('qqtext', that.pubtext(item));
				item.set('datediff', dateDiff(pubdate.getTime()));
				item.set('addr',item.get('datafrom')!=4?'无':'查看位置');
				nlist.push(item);
				return item;
			});
			
			this.setData({
				loading:false,
				list: nlist
			});
			skip=nlist.length;
			
			this.checknodata(results);
			

			this.hideloading();


		});
	},
	showloading() {
		wx.showNavigationBarLoading();
		this.setData({ loading: true,nodata:false });
	},
	hideloading() {
		wx.hideNavigationBarLoading();
		this.setData({ loading: false });
	},
	onLoad(option) {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
					sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
					scrollHeight:res.windowHeight-100,
				});
			}
		});
		// console.log(option);
		let fromaddr = option.fromaddr
		let toaddr = option.toaddr;
		let cptype = option.cptype ? option.cptype : 1;
		this.setData({
			fromaddr: fromaddr,
			toaddr, toaddr,
			cptype,cptype,
			activeIndex:cptype?0:1
			
		});
		wx.setNavigationBarTitle({
			title: this.getTitle(),
			success: function (res) {
				// success
			}
		});

		this.reload();

	},
	dopublish(e)
	{
		let currentUser = Bmob.User.current();
		if(currentUser)
		{
			let phoneverify=currentUser.get('mobilePhoneNumberverified');
			// this.goNav('/page/publish/publish');
			wx.switchTab({
			  url: '/page/publish/publish',
			  success: function(res){
				// success
			  },
			  fail: function(res) {
				// fail
			  },
			  complete: function(res) {
				// complete
			  }
			})
			
		}
	},
	goNav(path)
	{
		wx.navigateTo({
		  url: path,
		  success: function(res){
			// success
			console.log('success');
		  },
		  fail: function(res) {
			// fail
			console.log(res);
		  },
		  complete: function(res) {
			// complete
		  }
		})
	},
	openlocation(e)
	{
		let dataset = e.target.dataset;
		console.dir(dataset.datafrom,dataset.lat,dataset.lon);
		if(dataset.datafrom==4&&dataset.lat!=0&&dataset.lon!=0)
		{
			wx.openLocation({
			  latitude: dataset.lat, // 纬度，范围为-90~90，负数表示南纬
			  longitude: dataset.lon, // 经度，范围为-180~180，负数表示西经
			  scale: 28, // 缩放比例
			  // name: 'name', // 位置名
			  // address: 'address', // 地址的详细说明
			  success: function(res){
				// success
			  },
			  fail: function(res) {
				// fail
			  },
			  complete: function(res) {
				// complete
			  }
			})
		}
	},
	 onShareAppMessage()
    {
		let cpstr=this.data.cptype?'车找人':'人找车';
		cpstr=this.getTitle()+cpstr;
		let title=cpstr;
        return {
            title: cpstr,
            path: '/page/searchview/searchview?fromaddr='+this.data.fromaddr+"&toaddr="+this.data.toaddr+"&cptype="+this.data.cptype
        }
    }


});