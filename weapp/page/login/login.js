import common from '../../utils/common.js';
import Bmob from '../../utils/bmob';
let timer = null;
const MAXTIME = 10;
let startnum = MAXTIME;
Page({

	data: {
		phone: '',
		issend: false,
		cansend: true,
		sendsmstxt: '获取验证码'
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '手机绑定',
			success: function (res) {
				// success
			}
		});
	},
	getsmscode() {
		if (this.checksend()) {
			this.sendSms();
			console.log('发了');
			// this.showTimer();
			return;
		}
		console.log('不能发');
	},
	checksend() {
		if (this.data.phone == '') {
			// this.topTips('电话号码不能为空',1500);
			common.showTip('电话号码不能为空');
			return false;
		}
		let reg = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
		if (!reg.test(this.data.phone.toString())) {
			// this.topTips('电话号码格式不正确', 1500);
			common.showTip('电话号码格式不正确');
			return false;
		}
		return this.data.cansend;
	},
	phoneinput(e) {
		this.setData({
			phone: e.detail.value
		});
	},
	sendSms: function () {
		var that = this
		var phone = this.data.phone
		Bmob.Sms.requestSmsCode({ "mobilePhoneNumber": phone }).then(function (obj) {
			that.setData({
				phone: phone
			})
			common.showTip('发送成功');
			this.showTimer();

		}, function (err) {
			common.showTip('发送失败' + err);
		});
	},
	verifySms(code) {
		return Bmob.Sms.verifySmsCode(this.data.phone, code)
	},
	//手机绑定
	bindphone(e) {
		let smscode = e.detail.value.smscode;

		console.log(user);
		// common.showTip('验证码'+smscode);
		// return;
		let phone=this.data.phone;
		this.verifySms(phone, smscode).then((obj) => {
			// common.showTip('短信验证成功');
			let user = Bmob.User.current();
			if (user) {
				user.set('mobilePhoneNumber',this.data.phone);
				user.set('mobilePhoneNumberVerified',true);
				user.save().then(()=>{'绑定成功'});
			} else {
				common.showTip('用户未登录' + err);
			}

		}, (err) => {
			common.showTip('短信验证失败' + err);
		});

	},
	showTimer() {
		this.setData({
			cansend: false
		});
		clearInterval(timer);
		startnum = MAXTIME;
		timer = setInterval(() => {
			startnum--;
			let sendsmstxt = startnum + "秒后重发";
			if (startnum <= 0) {
				sendsmstxt = '获取验证码';
				startnum = MAXTIME;
				this.setData({
					cansend: true
				});
				clearInterval(timer);
			}
			this.setData({
				sendsmstxt: sendsmstxt
			});
		}, 1000);
	}




});