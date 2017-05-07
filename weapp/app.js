import login from 'utils/login.js';
var Bmob = require('utils/bmob.js');
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
        })
    },
    onShow: function () {
        // console.log('appshow');
       


    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        currentLocation:null
    }
});

