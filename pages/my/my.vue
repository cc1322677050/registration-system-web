<template>
	<view class="user-container">
		<view class="header-avatar">
			<image src="../../static/student_images.png" mode="widthFix"></image>
			<text class="header-avatar-text">姓名:{{userInfo.nikename}}</text>
			<text class="header-avatar-text">学号:{{userInfo.personId}}</text>
		</view>
		<view class="user-content">
			<view class="user-content-select" @click="jumpUpadta(userInfo.userId,0)">
				<text>查看我的预约</text>
			</view>
			<view class="user-content-select" @click="jumpUpadta(userInfo.userId,1)">
				<text>修改个人信息</text>
			</view>
			<view class="user-content-select" @click="jumpUpadta(userInfo.userId,2)">
				<text>安全中心</text>
			</view>
			<view class="user-content-select" @click="jumpUpadta(userInfo.userId,3)">
				<text>退出</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {clearToken} from "../../utils/auth.js"
	export default {
		data() {
			return {
				userInfo: {
					nikename: "",
					personId: "",
					userId: "",
					username: ""
				}
			}
		},
		methods: {
			getUserInfo() {
				this.$minApi.getUserInfo().then(res => {
					this.userInfo.userId = res.data.id
					this.userInfo.username = res.data.username
					this.userInfo.nikename = res.data.nikename
					this.userInfo.personId = res.data.personid
				})
			},
			jumpUpadta(id, info) {
				if(info==0){
					uni.navigateTo({
						url: '/pages/my/list?id='+this.userInfo.userId
					});
				}
				if(info==1){
					uni.navigateTo({
						url: '/pages/my/updata?id='+this.userInfo.userId+"&personId="+
						this.userInfo.personId+"&nikename="+this.userInfo.nikename
					});
				}
				if (info == 2) {
					uni.navigateTo({
						url: '/pages/my/password?id='+this.userInfo.userId
					})
				}
				if (info == 3) {
					clearToken()
					uni.reLaunch({
						url: '/pages/login/index',
					})
				}
			}
		},
		onShow() {
			this.getUserInfo()
		}
	}
</script>

<style lang="scss" scoped>
	.user-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20rpx;

		.header-avatar {
			text-align: center;
			border-radius: 100%;
			margin: 20rpx auto;

			.header-avatar-text {
				padding: 5rpx;
				display: block;
				font-size: 28rpx;
				color: #9999A6
			}

			image {
				width: 280rpx;
				border-radius: 100%;
			}
		}

		.user-content {
			.user-content-select {
				text-align: center;
				height: 50rpx;
				line-height: 50rpx;
				color: #FFFFFF;
				background-color: #007AFF;
				width: 650rpx;
				border-radius: 50rpx;
				margin: 20rpx auto;
				padding: 15rpx;
				font-size: 28rpx;
			}

			.user-content-select:active {
				background-color: #397FE9;
			}

			.user-content-select:nth-child(4) {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #F73809;
			}

			.user-content-select:nth-child(4):active {
				background-color: #E23F3F;
			}
		}
	}
</style>
