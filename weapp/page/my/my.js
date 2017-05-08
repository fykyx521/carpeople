Page({
    data:{
        avatarUrl:'../../images/basicprofile.png',
        nickName:''
    },
    onLoad()
    {
        let that=this;
        wx.getUserInfo({
          success: function(result){
                  var userInfo = result.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  that.setData({
                     nickName:nickName,
                     avatarUrl:avatarUrl
                  })
          },
          fail: function(res) { 
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
    },
    publish(e)
    {
        wx.redirectTo({
          url: '/page/publish/publish?fromindex=1&toindex=0'
        });
    }
})