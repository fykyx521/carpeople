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
					<input class="weui-input" type="number" pattern="[0-9]*" v-model='password' placeholder="请输入密码">
				</div>
			</div>
			<div class="weui-cell">
				<button class="weui-btn weui-btn_primary" @click="register">注册</button>
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
			register ()
			{
				var user = new Bmob.User();
				user.set("username", this.phone);
				user.set("password", this.password);
				// user.set("email", "email@example.com");

// other fields can be set just like with Bmob.Object
				user.set("phone", this.phone);

				user.signUp(null, {
					success: function(user) {
						console.dir(user);
    					// Hooray! Let them use the app now.
					},
					error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    					alert("Error: " + error.code + " " + error.message);
					}
				});
			}
		}
	}
</script>