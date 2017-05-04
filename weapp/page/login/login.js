Page({
	
	data:{

	},
	onLoad()
	{
		wx.setNavigationBarTitle({
		  title: '手机绑定',
		  success: function(res) {
			// success
		  }
		});
	},

	sendSms: function (event) {
        var that = this
        var phone = event.detail.value.phone;
        Bmob.Sms.requestSmsCode({ "mobilePhoneNumber": phone }).then(function (obj) {
            that.setData({
                phone: phone
            })
            common.showTip('发送成功' + "smsId:" + obj.smsId);

        }, function (err) {
            common.showTip('发送失败' + err);
        });

    },




});