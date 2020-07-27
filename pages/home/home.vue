<template>
	<view>
		<uni-card :title="item.subjects" mode="style" :is-shadow="true" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
		 :extra="'考试费: '+item.money+'元'" :note="'考试类型:  '+item.type" v-for="item in list">
			<text class="card-item-text">预约时间:{{item.registrationtime}}</text>
			<text class="card-item-text">考试时间:{{item.examinationtime}}</text>
			<text class="card-item-text">公布时间:{{item.publicationtime}}</text>
			<text class="card-item-text" style="float: right;">考试类型:{{item.type}}</text>
			<template v-slot:footer>
				<view class="card-footer">
					<button :disabled="isdisabled(item.id)" type="primary" class="card-footer-item" @click="handleItem(item.id)">
						{{isdisabled(item.id)?"已经预约":"立即预约"}}
					</button>
				</view>
			</template>
		</uni-card>
	</view>
</template>

<script>
	import {
		getUserId
	} from "@/utils/auth"
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				list: [],
				infoIds: [],
				reserve: {
					infoId: "",
					userId: ""
				}
			}
		},
		methods: {
			getAll() {
				this.$minApi.getAllExam().then(res => {
					this.list = res.data
				})
			},
			isdisabled(id) {
				return this.infoIds.indexOf(id) != -1
			},
			getMyReserve() {
				this.infoIds = []
				this.$minApi.getCurrentUserReserve(getUserId()).then(res => {
					for (let i = 0; i < res.data.length; i++) {
						this.infoIds.push(res.data[i].infoId)
					}
				})
			},
			handleItem(id) {
				this.reserve.infoId = id
				this.reserve.userId = getUserId()
				this.$minApi.addReserve(this.reserve).then(res => {
					this.getAll()
					this.getMyReserve()
				}).catch(error => {

				})
			}
		},
		onShow() {
			this.getAll()
			this.getMyReserve()
		}
	}
</script>

<style lang="scss" scoped>
	.card-footer {
		float: right;
		width: 30%;

		.card-footer-item {
			font-size: 28rpx;
		}
	}

	.card-footer::after {
		content: " ";
		clear: both;
	}
</style>
