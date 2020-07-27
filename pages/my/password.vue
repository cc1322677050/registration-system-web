<template>
	<view class="login-container">
		<view class="login-form-item">
			<text class="label">旧密码</text>
			<input password="true" v-model="registerfrom.oldPassword" class="input" placeholder="请输入旧密码" />
		</view>
		<view class="login-form-item">
			<text class="label">新密码</text>
			<input password="true" v-model="registerfrom.newPassword" class="input" placeholder="请输入新密码" />
		</view>
		<view class="login-form-item">
			<text class="label">再次确人新密码</text>
			<input password="true" v-model="registerfrom.newPassword1" class="input" placeholder="请再次输入新密码" />
		</view>
		<view class="login-form-item">
			<button :loading="loading" @click="registerHandler()" class="login-form-button">提交</button>
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
					id: "",
					oldPassword: "",
					newPassword: "",
					newPassword1: ""
				},
				errorMessage: "",
				successMessage: "",
				loading: false
			}
		},
		methods: {
			registerHandler() {
				this.loading = true
				if (this.registerfrom.oldPassword.trim() == "" ||
					this.registerfrom.newPassword.trim() == "" ||
					this.registerfrom.newPassword1.trim() == ""
				) {
					this.errorMessage = "当前有未填的字段,请填写后重试"
					this.$refs.errorPop.open()
					this.loading = false
					return
				}
				if(this.registerfrom.newPassword.length<6){
					this.errorMessage = "密码最小长度为6"
					this.$refs.errorPop.open()
					this.loading = false
					return
				}
				if(this.registerfrom.newPassword!=this.registerfrom.newPassword1){
					this.errorMessage = "两次密码输入不一致"
					this.$refs.errorPop.open()
					this.loading = false
					return
				}
				this.$minApi.updataUserPassword(this.registerfrom).then(res=>{
					this.successMessage=res.data
					this.$refs.successPop.open()
				})
				this.loading = false
			}
		},
		onLoad: function(option) {
			this.registerfrom.nikename = option.nikename
			this.registerfrom.personid = option.personId
			this.registerfrom.id = option.id
		}
	}
</script>

<style lang="scss" scoped>

</style>
