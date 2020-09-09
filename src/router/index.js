import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
		children: [
			{
				path: '',
				name: 'Dashboard',
				component: () => import(/* webpackChunkName: "dashboard-child" */ '../views/Dashboard/Schedule.vue')
			},
			{
				path: '/ics',
				name: 'Icalendar',
				component: () => import(/* webpackChunkName: "dashboard-ics" */ '../views/Dashboard/Icalendar.vue')
			},
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
