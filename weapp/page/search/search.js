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
        
        console.log('index',this.data.fromindex,this.data.toindex);
        let fromaddr=indexToAddr(this.data.fromindex);
        let toaddr=indexToAddr(this.data.toindex);
        console.log('asfdf',fromaddr,toaddr);
        // wx.showNavigationBarLoading();
        wx.navigateTo({
          url: '/page/searchview/searchview?fromaddr='+fromaddr+"&toaddr="+toaddr,
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
        
    }

    
});