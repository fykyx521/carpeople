import Bmob from '../../utils/bmob';
import common from '../../utils/common.js';
import { indexToAddr, showLoading, hideLoading,navigateTo,redirectTo } from '../../utils/cputil';
Page({
    data: {
        showTopTips: false,

        // radioItems: [
        //     {name: '车找人', value: '0'},
        //     {name: '人找车', value: '1', checked: true}
        // ],

        radioItems: [
            { name: '人找车', value: '0' },
            { name: '车找人', value: '1', checked: true },

        ],

        peoplenum: 1,
        phone: '',
        lat: 0,
        lon: 0,

        cptype: 1,


        startdate: "2016-09-01",
        starttime: "12:01",
        // 人数
        peoplearr: [1, 2, 3, 4],
        peopleindex: 0,
        // 出发地
        fromcity: ["临县", "太原", "离石"],
        fromindex: 0,
        //目的地
        tocity: ["临县", "太原", "离石"],
        toindex: 1,
        ftype: true, //默认车找人
        addressname: '选择详细位置'
    },
    onLoad(option) {

        let date = new Date();
        let startdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        // console.log(option.fromindex, )
        
        this.setData({ startdate: startdate, fromindex: option.fromindex, toindex: option.toindex });

        wx.setNavigationBarTitle({
            title: '发布拼车信息',
            success: function (res) {
                // success
            }
        })
        let that = this;
        wx.getLocation({
            type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function (res) {
                that.setData({
                    lat: res.latitude,
                    lon: res.longitude
                })
            },
            fail: function (res) {
                // fail
            },
            complete: function (res) {
                // complete
            }
        })
    },
    //出发地
    bindfromchange(e) {
        this.setData({
            fromindex: e.detail.value
        })
    },
    //目的地
    bindtochange(e) {
        this.setData({
            toindex: e.detail.value
        })
    },
    showTopTips: function () {
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function () {
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    //电话号码
    phonechange(e) {
        this.setData({ phone: e.detail.value });
    },
    //人数
    bindpeoplechange(e) {
        let peopleindex = e.detail.value;
        this.setData({
            peopleindex: peopleindex,
            peoplenum: this.data.peoplearr[peopleindex]
        });
    },
    //出发日期
    bindDateChange: function (e) {
        this.setData({
            startdate: e.detail.value
        })
    },
    //出发时间
    bindTimeChange: function (e) {
        this.setData({
            starttime: e.detail.value
        })
    },


    radioChange: function (e) {

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }
        this.setData({
            radioItems: radioItems,
            cptype: e.detail.value
        });
    },

    bindftypeChange: function (e) {
        console.log('value' + e.detail.value);
        this.setData({
            ftype: e.detail.value
        });
    },
    bindsubmit: function (e) {

        let detail = e.detail.value;
        let phone = detail.phone;
        if (this.data.fromindex == this.data.toindex) {
            wx.showToast({ title: '出发地目的地不能相同' });
            return;
        }
        if (!this.checkphone(phone)) {
            return;
        }

        let findtype = this.ftype ? 1 : 0;

        let fromaddr = indexToAddr(this.data.fromindex);
        let toaddr = indexToAddr(this.data.toindex);
        let startdate = this.getStartDate();
        let CarPeople = Bmob.Object.extend("icp");
        let car = new CarPeople();
        let current = Bmob.User.current();
        var point = new Bmob.GeoPoint({ latitude: this.data.lat, longitude: this.data.lon });

        car.set("cptype", Number(this.data.cptype));
        car.set('from', Number(fromaddr));
        car.set('to', Number(toaddr));
        car.set("peoplenum", Number(this.data.peoplenum));
        car.set("phone", Number(detail.phone));
        car.set('startdate', startdate);
        car.set('starttime', startdate.getTime());
        car.set('datafrom', 4);
        car.set('lat', this.data.lat);
        car.set('lon', this.data.lon);
        car.set('parent', current);
        car.set('own', current.id);
        car.set('geopoint', point);
        // console.log(detail.mobile + ':' + detail.startdate);
        showLoading();
        car.save(null).then(() => {
            wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 2000
            })
            hideLoading();
            redirectTo('/page/searchview/searchview?fromaddr='+fromaddr+'&toaddr='+toaddr).then((res)=>{console.log('发布跳转')},true);
        });
    },
    getStartDate() {
        let datestr = this.data.startdate + ' ' + this.data.starttime;
        let pubdate = new Date(Date.parse(datestr.replace(/-/g, "/")));
        return pubdate;
    },
    //
    chooselocation(e) {

        let that = this;
        wx.chooseLocation({
            success: function (res) {
                that.setData({
                    lat: res.latitude,
                    lon: res.longitude,
                    addressname: res.name
                });
            },
            fail: function (res) {
                // fail
                console.log(res);
            },
            complete: function (res) {
                // complete
                console.log(res);
            }
        })
    },
    checkphone(phone) {
        if (phone == '') {
            // this.topTips('电话号码不能为空',1500);
            common.showTip('电话号码不能为空');
            return false;
        }
        let reg = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
        if (!reg.test(phone.toString())) {
            // this.topTips('电话号码格式不正确', 1500);
            common.showTip('电话号码格式不正确');
            return false;
        }
        return true;
    }

});