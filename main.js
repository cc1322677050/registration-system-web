import Vue from 'vue'
import App from './App'
import store from './store'
import MinRequest from './utils//MinRequest'
import minRequest from './api/api'
import "@/styles/index.scss"
Vue.config.productionTip = false
App.mpType = 'app'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.use(MinRequest)
const app = new Vue({
	store,
	minRequest,
	...App
})
app.$mount()
