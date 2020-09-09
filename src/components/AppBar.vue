<!-- @format -->

<template>
	<v-app-bar absolute app color="transparent" flat fixed>
		<v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>

		<v-toolbar-title>
			KMA&nbsp;
			<span class="font-weight-light">Schedule</span>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-menu left bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-bind="attrs" v-on="on" class="mr-1">
					<v-icon>fas fa-power-off</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item @click="() => {}">
					<v-list-item-title>
						<v-icon class="mr-2">fas fa-sign-out-alt</v-icon>
						Đăng Xuất
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script>

	export default {
		name: 'AppBar',
		methods: {
			switchDrawer() {
				this.drawer = !this.drawer
			},
		}
	}
</script>

<style></style>
