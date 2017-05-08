import { fromtostr,showToast } from '../../../utils/cputil';
import Bmob from '../../../utils/bmob';
import api from '../../../utils/api.js';
var sliderWidth = 96;
let skip=0;
let hasmore=true;
Page({
	data:{
		list:[],
		tabs: ["车找人", "人找车"],
		nodatatxt: "没有更多数据了",
		activeIndex:0,
		cptype:1,
		loading:true,
		nodata:false,
		sliderOffset: 0,
		sliderLeft: 0,
	},
	tabClick(e) {
		this.setData({ 
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id,
			cptype: e.currentTarget.id == 1 ? 0 : 1
		});
		this.reload();
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
	onLoad()
	{
		let that=this;
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
					sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
					
				});
			}
		});
		this.load();
	},
	checknodata(results)
	{
		if (results.length == 0) {
				hasmore=false;
				this.setData({ nodata: true });
		}
		let nodatatxt= "暂无数据";
		this.setData({
			nodatatxt:nodatatxt
		});
	},
	delcp(e)
	{
		let itemid = e.currentTarget.dataset.id;
		console.log('del'+itemid);
		api.delsafe('icp',itemid).then(()=>{
			showToast('删除成功');
			this.reload();  
		});
	},
	load()
	{   
		if(!hasmore)
		{
			return;
		}
		this.showloading();
		let current=Bmob.User.current();
		var ICP = Bmob.Object.extend("icp");
		var query = new Bmob.Query(ICP);
		query.limit(100);
		query.skip(skip);
		query.equalTo('own',current.id);
		query.equalTo("cptype", this.data.cptype);
		// query.ascending("startdate");
		query.doesNotExist("deletedAt");
		query.descending("updatedAt");
		let nlist=this.data.list;
		query.find().then(results=>{

			results.forEach(function (item, index) {
				item.set('fromtostr',fromtostr(item.get('from'),item.get('to')));
				item.set('startdt', item.get('startdate'));
				let pubdate = new Date(Date.parse(item.updatedAt.replace(/-/g, "/")))
				// console.log('pubdate'+item.updatedAt);
				// item.set('qqtext', that.pubtext(item));
				// item.set('datediff', dateDiff(pubdate.getTime()));
				item.set('addr',item.get('datafrom')!=4?'':'');
				nlist.push(item);
				return item;
			});
			this.setData({
				list:nlist
			});
			this.checknodata(results);
			skip=nlist.length;
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
})