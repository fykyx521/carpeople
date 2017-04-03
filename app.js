import login from 'utils/login.js';
App({
    onLaunch: function () {
        var Bmob = require('utils/bmob.js');
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

