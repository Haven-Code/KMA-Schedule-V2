<!-- @format -->

<template>
	<v-app>
		<AppBar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer" />

		<Drawer ref="drawer" />

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: 'Dashboard',
		components: {
			AppBar: () => import('../components/AppBar'),
			Drawer: () => import('../components/Drawer'),
		},
		data: () => ({
		}),
	}
</script>
