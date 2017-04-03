import Bmob from '../../utils/bmob';
Page({
    data: {
        showTopTips: false,

        // radioItems: [
        //     {name: '车找人', value: '0'},
        //     {name: '人找车', value: '1', checked: true}
        // ],

        radioItems: [
            {name: '临县到太原', value: '0'},
            {name: '太原到临县', value: '1', checked: true},
            // {name: '太原到临县', value: '2'},
            // {name: '太原到离石', value: '3'},
            // {name: '离石到太原', value: '4'},
            // {name: '离石到临县', value: '5'},
        ],

        peoplenum:2,
        mobile:'',


        checkboxItems: [
            {name: 'standard is dealt for u.', value: '0', checked: true},
            {name: 'standard is dealicient for u.', value: '1'}
        ],

        startdate: "2016-09-01",
        starttime: "12:01",

        countryCodes: ["+86", "+80", "+84", "+87"],
        countryCodeIndex: 0,

        countries: ["中国", "美国", "英国"],
        countryIndex: 0,

        accounts: ["微信号", "QQ", "Email"],
        accountIndex: 0,

        ftype: true
    },
    showTopTips: function(){
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    //电话号码
    mobilechange(e)
    {
        this.setData({mobile:e.detail.value});
    },
    //人数
    peoplenumchange (e)
    {
        this.setData({
            peoplenum: e.detail.value
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
        console.log('radio发生change事件，携带value值为：', e.detail.value);
        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }
        this.setData({
            radioItems: radioItems
        });
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].value == values[j]){
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });
    },
    
   
    bindftypeChange: function (e) {
        console.log('value'+e.detail.value);
        this.setData({
            ftype:e.detail.value
        });
    },
    bindsubmit: function(e){
        var CarP = Bmob.Object.extend("car_people");
        var car=new CarP();
        let findtype=this.ftype?1:0;
        console.log(this.findtype);
        let detail=e.detail.value;
        console.log(detail);
        let startdate=Date.parse(detail.startdate);
        // Date.parse()/
        car.set("findtype",findtype);
        car.set("peoplenum",detail.peoplenum);
        car.set("mobile",Number(detail.mobile));
        car.set('startdate',new Date(startdate));
        // car.set('starttime',detail.starttime);
        car.set("from",1);
        car.set("to",10);
        car.set('price',detail.price);
        console.log(detail.mobile+':'+detail.startdate);
        car.save(null,{
            success(){
                console.log('success');
            },
            error(result,error){
                console.dir(error);
            }
        })

    }
});