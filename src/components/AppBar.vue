<!-- @format -->

<template>
	<v-app-bar absolute app flat fixed class="blue--text lighten-3">
		<v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')" class="blue--text lighten-3"></v-app-bar-nav-icon>

		<v-spacer></v-spacer>

		<v-toolbar-title class="text-h5">
			<strong>KMA&nbsp;</strong>
			<span class="font-weight-light">Schedule</span>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-on:click="darkMode" v-bind="attrs" v-on="on" class="mr-1 blue--text lighten-1">
					<v-icon>mdi-theme-light-dark</v-icon>
				</v-btn>
			</template>
			<span>Chuyển Đổi Giao Diện</span>
		</v-tooltip>

		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-on:click="signOut" v-bind="attrs" v-on="on" class="mr-1 blue--text lighten-1">
					<v-icon class="mr-2">fas fa-sign-out-alt</v-icon>
				</v-btn>
			</template>
			<span>Đăng Xuất</span>
		</v-tooltip>

	</v-app-bar>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'AppBar',
		computed: {
			...mapState(['config']),
		},
		data: () => ({}),
		methods: {
			switchDrawer() {
				this.drawer = !this.drawer
			},
			darkMode() {
				this.$vuetify.theme.dark = !this.$vuetify.theme.dark
				this.$store.commit('config/SET_THEME', this.$vuetify.theme.dark)
			},
			signOut() {
				this.$swal({
					title: 'Bạn Có Muốn Thoát ?',
					icon: 'question',
					showCancelButton: true,
					confirmButtonText: `Có !`,
					cancelButtonText: `Không !`,
				}).then((result) => {
					if (result.value) {
						this.$store.commit('user/LOGOUT')
						this.$router.push({ name: 'LD' })
					}
				})
			},
		},
		created() {
			if (this.config.darkTheme == null) {
				let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
				this.$vuetify.theme.dark = theme
				this.$store.commit('config/SET_THEME', theme)
			} else {
				this.$vuetify.theme.dark = this.config.darkTheme || false
			}
		},
	}
</script>

<style lang="scss">
	.swal2-modal {
		font-family: Helvetica;
	}
</style>
