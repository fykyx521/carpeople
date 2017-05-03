import login from 'utils/login.js';
App({
    onLaunch: function () {
        var Bmob = require('utils/bmob.js');
        Bmob.initialize("d906953dd3d938e25d240485f44c57bd", "e9c5aaa92fd184361486049d4fef2a8c");
        console.log('App Launch')
        
        login.login();
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false
    }
});

