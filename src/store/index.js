import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls";

const ls = new SecureLS({
	isCompression: false,
	encodingType: 'aes',
	encryptionSecret: '3f0546a9a3664d3639566c893e30ad14d9c74e00f3c20a89fd6c8415935c89c6dcb700bff3804a4e453ab41e0570a5a1edebfd2d42f9389cd8a41e5192b46c8c'
});

import config from './config'
import user from './user'

const pluginState = createPersistedState({
	storage: {
		getItem: key => ls.get(key),
		setItem: (key, value) => ls.set(key, value),
		removeItem: key => ls.remove(key)
	},
	path: [
		'user',
		'config'
	]
})

export default new Vuex.Store({
	state: {
		drawer: null,
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		user: user,
		config: config
	},
	plugins: [pluginState],
})
