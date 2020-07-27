<template>
	<view>
		<uni-card :title="item.subjects" mode="style" :is-shadow="true" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
		 :extra="'考试费:'+item.money+'元'" :note="item.type" v-for="item in list">
			<text class="card-item-text">预约时间:{{item.registrationtime}}</text>
			<text class="card-item-text">考试时间:{{item.examinationtime}}</text>
			<text class="card-item-text">公布时间:{{item.publicationtime}}</text>
			<text class="card-item-text" style="float: right;">考试类型:{{item.type}}</text>
			<template v-slot:footer>
				<view class="card-footer">
					<button v-show="!isdisabled(item.infoId)" type="primary" @click="cancelItem(item.id)" class="card-footer-item">
						取消预约
					</button>
					<button :disabled="isdisabled(item.infoId)" type="primary" class="card-footer-item" @click="handleItem(item.infoId,item.money)">
						{{!isdisabled(item.infoId)?"立即支付":"已经支付"}}
					</button>
				</view>
			</template>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: "",
				list: [],
				loading: false,
				listIds: []
			}
		},
		methods: {
			getUserPayInfo() {
				this.listIds = []
				this.$minApi.getPayInfo(this.userId).then(res => {
					for (let index = 0; index < res.data.length; index++) {
						this.listIds.push(res.data[index].infoId)
					}

				})
			},
			isdisabled(id) {
				return this.listIds.indexOf(id) != -1
			},
			getAll() {
				this.$minApi.getCurrentUserReserve(this.userId).then(res => {
					this.list = res.data
					this.getUserPayInfo()
				}).catch(error => {
				
				})
			},
			cancelItem(id) {
				this.$minApi.deleteReserve(id).then(res => {
					this.getAll()
				}).then(res => {
				})
			},
			handleItem(id, money) {
				this.loading = true
				let info = {
					infoId: id,
					userId: this.userId,
					money: money
				}
				uni.showLoading({
					title: '正在支付,请稍等'
				});
				this.$minApi.pay(info).then(res => {
					this.getAll()
					uni.hideLoading();
				})
				this.loading = false
			}
		},
		onLoad(option) {
			this.userId = option.id
			this.getAll()
		}

	}
</script>

<style lang="scss" scoped>
	.card-item-text {
		display: block;
		font-size: 28rpx;
		color: #9999A6;
	}

	.card-footer {
		.card-footer-item {
			float: right;
			width: 30%;
			font-size: 28rpx;
		}

		.card-footer-item:nth-child(1) {
			float: left;
		}
	}

	.card-footer::after {
		content: " ";
		clear: both;
	}
</style>
