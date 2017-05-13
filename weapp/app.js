var Bmob = require('utils/bmob.js');
import login from 'utils/login.js';
import cputil from 'utils/cputil.js';
import api from 'utils/api.js';
App({
    onLaunch: function () {
        
        Bmob.initialize("d906953dd3d938e25d240485f44c57bd", "e9c5aaa92fd184361486049d4fef2a8c");
        
        login.login();
        let that=this;
        wx.getLocation({
          type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function(res){
            // success
            that.globalData.currentLocation=new Bmob.GeoPoint({latitude: res.latitude, longitude: res.longitude})
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        });
        
        let query=api.query('icpconfig');
        query.ascending("addrorder");
        query.find().then(results=>{
            let addrlist={};
            let addrkv=[];
            results.forEach((item,index)=>{
                let addrname = item.get('addrname');
                Object.defineProperty(addrlist, item.get('addrid') + '', { value: addrname});
                // addrlist[item.get('addrid')]
                addrkv.push({addrname:index});
            });
            console.log(addrlist);
            this.globalData.addrlist=addrlist;
            this.globalData.addrkv=addrkv;
        });
    },
    onShow: function () {
         console.log('appshow');
         


    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        currentLocation:null,
        addrlist: { 141124: "临县", 140100: "太原", 141102: "离石", },
        addrkv:[141124,140100,141102]

    }
});

