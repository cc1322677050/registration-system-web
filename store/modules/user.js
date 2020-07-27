import {saveToken,clearToken,saveUserId} from '@/utils/auth'
import Vue from 'vue'
const user = {
	state: {
		token: '',
		name: '',
		userId: "",
		roles: []
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_USER_ID: (state, userId) => {
			state.userId = userId
		}
	},

	actions: {
		// 登录
		Login({
			commit
		}, userInfo) {
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) => {
				Vue.prototype.$minApi.login(userInfo).then(response => {
					clearToken()
					const data = response.data
					const tokenStr = "Bearer " + data.tokenStr
					saveToken(tokenStr)
					commit('SET_TOKEN', tokenStr)
					commit("SET_USER_ID", data.id)
					commit("SET_NAME", data.username)
					commit("SET_ROLES", data.roles)
					saveUserId(data.id)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		}
	}
}

export default user
