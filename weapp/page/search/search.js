import {indexToAddr} from '../../utils/cputil';
Page({
    data: {

        fromcounty: ["临县", "太原", "离石"],
        fromindex: 0,

        tocounty: ["临县", "太原", "离石"],
        toindex: 1,

        showTopTips: false,

        isAgree: false
    },
    onLoad(option)
    {
        
        let fromindex = option.fromindex?option.fromindex:0
		let toindex = !option.toindex?1:option.toindex;
		let cptype = option.cptype ? option.cptype : 1;
		this.setData({
			fromindex: fromindex,
			toindex, toindex,
            cptype:cptype
		});
    },
    bindfromchange(e){
        this.setData({
            fromindex: e.detail.value
        })
    },
    bindtochange(e){
        this.setData({
            toindex: e.detail.value
        })
    },
    changefromto(e)
    {
        let fromindex=this.data.fromindex;
        let toindex=this.data.toindex;
        this.setData({
            fromindex:toindex,
            toindex:fromindex
        });
    },
   
    dosearch(e)
    {
        if(this.data.fromindex==this.data.toindex)
        {
            wx.showToast({title:'出发地目的地不能相同'})
            return;
        }
        let fromaddr=indexToAddr(this.data.fromindex);
        let toaddr=indexToAddr(this.data.toindex);
        // console.log('asfdf',fromaddr,toaddr);
        // wx.showNavigationBarLoading();
        wx.navigateTo({
          url: '/page/searchview/searchview?fromaddr='+fromaddr+"&toaddr="+toaddr+'&fromindex='+this.data.fromindex+'&toindex='+this.data.toindex,
          success: function(res){
            // success
            console.log('success');
          },
          fail: function(res) {
            // fail
            console.log(res);
          },
          complete: function(res) {
            // complete
            console.log(res);
          }
        });
        
    },
    onPullDownRefresh: function(){
        wx.stopPullDownRefresh();
    },
    onShareAppMessage()
    {
        return {
            title: '拼车搜索',
            path: '/page/user?from='+this.data.fromindex+"&to="+this.data.toindex
        }
    }

    
});