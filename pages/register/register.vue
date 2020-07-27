<template>
	<view class="login-container">
		<view class="login-form-item">
			<text class="label">账号</text>
			<input v-model="registerfrom.username" class="input" placeholder="请输入账号" />
		</view>
		<view class="login-form-item">
			<text class="label">密码</text>
			<input password="true" v-model="registerfrom.password" class="input" placeholder="请输入密码" />
		</view>
		<view class="login-form-item">
			<text class="label">姓名</text>
			<input v-model="registerfrom.nikename" class="input" placeholder="请输入真实姓名" />
		</view>
		<view class="login-form-item">
			<text class="label">身份证号</text>
			<input v-model="registerfrom.personid" class="input" placeholder="请输入身份证号" />
		</view>
		<view class="login-form-item">
			<button :loading="loading" @click="registerHandler()" class="login-form-button">注册</button>
		</view>
		<uni-popup ref="errorPop" type="top">
			<uni-popup-message type="error" :message="errorMessage" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="successPop" type="top">
			<uni-popup-message type="success" :message="successMessage" :duration="2000"></uni-popup-message>
		</uni-popup>
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
				registerfrom: {
					username: "",
					password: "",
					nikename: "",
					personid: ""
				},
				errorMessage: "",
				successMessage: "",
				loading: false
			}
		},
		methods: {
			registerHandler() {
				this.loading = true
				if (this.registerfrom.username.trim() == "" ||
					this.registerfrom.password.trim() == "" ||
					this.registerfrom.nikename.trim() == "" ||
					this.registerfrom.nikename.trim() == ""
				) {
					this.errorMessage = "当前有未填的字段,请填写后重试"
					this.$refs.errorPop.open()
					this.loading = false
					return
				}
				this.$minApi.register(this.registerfrom).then(res => {
					this.successMessage = res.data
					this.$refs.successPop.open()
					this.loading = false
				}).catch(() => this.loading = true)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
