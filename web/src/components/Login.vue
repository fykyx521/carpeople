<template>
	<form>
		<div class="weui-cells weui-cells_form">

			<div class="weui-cell weui-cell_vcode">
				<div class="weui-cell__hd">
					<label class="weui-label">手机号</label>
				</div>
				<div class="weui-cell__bd">
					<input class="weui-input" type="tel" placeholder="请输入手机号" v-model='phone'>
				</div>
				<div class="weui-cell__ft">
					<button class="weui-vcode-btn">获取验证码</button>
				</div>
			</div>

			<div class="weui-cell">
				<div class="weui-cell__hd"><label class="weui-label">密码</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入密码" v-model='password'>
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-btn weui-btn_primary" @click="login">登录</div>
			</div>
		</div>
	</form>
</template>
<script>
	
	export default {
		name:'login',
		created()
		{

		},
		methods:{
			login ()
			{
				Bmob.User.logIn(this.phone, this.password, {
					success: function(user) {
// Do stuff after successful login.
						console.log('登录成功');
					},
					error: function(user, error) {
					// The login failed. Check error to see why.
					}
				});
			}
		}
	}
</script>