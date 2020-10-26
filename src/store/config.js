module.exports = {
	namespaced: true,
	state: {
		darkTheme: null
	},
	mutations: {
		SET_THEME: (state, payload) => {
			state.darkTheme = Boolean(payload)
		}
	},
	actions: {
	},
}