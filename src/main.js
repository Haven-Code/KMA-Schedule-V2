/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// import VCalendar from 'v-calendar'

// Vue.use(VCalendar, {
// 	componentPrefix: 'vc',
// })

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)

Vue.config.productionTip = false

import './registerServiceWorker'

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app')
