import Vue from 'vue'
import MinRequest from '@/utils/MinRequest'
import globalConfig from '@/config'
import {clearToken} from "@/utils/auth"
const minRequest = new MinRequest()
// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = globalConfig.baseUrl
	return config
})
// 请求拦截器
minRequest.interceptors.request((request) => {
	return request
})
// 响应拦截器
minRequest.interceptors.response((response) => {
	//连接响应状态码不等于200的
	if (response.statusCode != 200) {
		if (response.data.data == 'token已失效'||response.data.data=="无效token令牌") {
			uni.showToast({
				title: response.data.data,
				icon: "none"
			}).then(res=>{
				clearToken()
				uni.reLaunch({
					url: '/pages/login/index',
				})
			})
			return
		}
		uni.showToast({
			title: response.data.message,
			icon: "none"
		})
		return
	}
	if (response.data.code == 500) {
		uni.showToast({
			title: response.data.data,
			icon: "none"
		})
		return
	}
	return response.data
})


export default {
	apis: {
		login(params) {
			return minRequest.post('/login', params)
		},
		register(params) {
			return minRequest.post('/user/register', params)
		},
		//获取全部考试信息
		getAllExam() {
			return minRequest.get('/exam/all')
		},
		//获取用户信息
		getUserInfo(){
			return minRequest.get('/user/info')
		},
		//更新用户信息
		updataUserInfo(params){
			return minRequest.put('/user',params)
		},
		//获取用户所预约的信息
		getCurrentUserReserve(userId){
			return minRequest.get('/reserve/all/'+userId)
		},
		//修改密码
		updataUserPassword(params){
			return minRequest.put('/user/password',params)
		},
		//通过id获取考试信息
		getExamByID(id){
			return minRequest.get('/exam/'+id)
		},
		//预约考试
		addReserve(params){
			return minRequest.post('/reserve',params)
		},
		//取消预约
		deleteReserve(id){
			return minRequest.Delete('/reserve/'+id)
		},
		//保存支付接口
		pay(params){
			return minRequest.post('/pay',params)
		},
		//获取支付信息
		getPayInfo(params){
			return minRequest.get('/pay/user/'+params)
		}
	}
}
