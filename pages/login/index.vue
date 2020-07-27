<template>
	<view class="login-container">
		<view class="logo">
			<image src="../../static/examinationlogo.png" mode="widthFix"></image>
			<h3>考试预约报名系统</h3>
		</view>
		<view class="login-form-item">
			<text class="label">账号</text>
			<input v-model="loginform.username" class="input" placeholder="请输入账号" />
		</view>
		<view class="login-form-item">
			<text class="label">密码</text>
			<input password="true" v-model="loginform.password" class="input" placeholder="请输入密码" />
		</view>
		<view class="login-form-item">
			<button :loading="loading" :disabled="loading" @click="handleLogin()" class="login-form-button">登陆</button>
		</view>
		<uni-popup ref="popup" type="top">
			<uni-popup-message type="error" :message="errorMessage" :duration="2000"></uni-popup-message>
		</uni-popup>
		<view class="login-form-item">
			<view class="login-text">
				<text @click="handlerForget()">忘记密码</text>
				<text @click="handlerRegister()">点击注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				loading: false,
				loginform: {
					username: "admin",
					password: "admin12"
				},
				errorMessage: ""
			}
		},
		methods: {
			handleLogin() {
				this.loading = true
				if (this.loginform.username.trim() == "" || this.loginform.password.trim() == "") {
					this.errorMessage = "账号或密码不能为空"
					this.$refs.popup.open()
					return
				}
				this.$store.dispatch('Login', this.loginform).then(res => {
					uni.reLaunch({
						url: '../home/home',
					})
				}).catch((error) => {
					this.loading=false
				})
			},
			handlerForget() {
				this.errorMessage = "抱歉,该功能在暂时无法使用!"
				this.$refs.popup.open()
			},
			handlerRegister() {
				uni.navigateTo({
					url: '../register/register'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
