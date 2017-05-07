import api from '../../../utils/api.js';
Page({

	data:{

	},
	onReady()
	{
		wx.setNavigationBarTitle({
		  title: '意见反馈',
		  success: function(res) {  
			// success
		  }
		});
	},
	publish(e)
	{
		console.log("publish feedback");
		let title=e.detial.value.title;
		let content=e.detail.value.content;
		if(content=='')
		{
			wx.showToast({title:'反馈内容不能为空'})
			return;
		}
		api.createObj('feedback',
			{'title':title,'content':content}
		).save().then((res)=>{wx.showToast({title:'感谢您的反馈'});wx.navigateBack()});


	}

})