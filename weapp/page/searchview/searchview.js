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
				console.log('success');
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
	ondown()
	{
		
		this.load();

	},
	reload(){
		skip=0;
		hasmore=true;
		this.setData({list:[]});
		this.load();
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
		// query.greaterThanOrEqualTo("startDate",startdate);
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
				nlist.push(item);
				return item;
			});
			
			this.setData({
				loading:false,
				list: nlist
			});
			skip=nlist.length;
			
			if (results.length == 0) {
				hasmore=false;
				this.setData({ nodata: true });
			}

			this.hideloading();


		});
	},
	showloading() {
		wx.showNavigationBarLoading();
		this.setData({ loading: true });
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
			toaddr, toaddr
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
			if(phoneverify)
			{
				this.goNav('/page/publish/publish');
			}else{
				this.goNav('/page/login/login');
			}
			
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
	}


});