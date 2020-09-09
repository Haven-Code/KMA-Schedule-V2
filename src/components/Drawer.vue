<!-- @format -->

<template>
	<v-navigation-drawer v-model="drawer" app dark color="grey darken-1">
		<v-list dense nav>
			<v-list-item>
				<v-list-item-avatar class="align-self-center" color="white" contain>
					<v-img src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico" max-height="30" />
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title class="text-body-2" >ABC</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-divider class="mb-2" />

		<v-list expand nav>
			<v-list-item-group mandatory>
				<v-list-item exact :active-class="`primary white--text`" v-for="(item, index) in items" :key="index" :to="{ name: item.routerName }">
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title>
							{{ item.name }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>

		<template v-slot:append>
			<v-list-item-group mandatory>
				<v-list-item link class="green lighten-1" dark>
					<v-list-item-action>
						<v-icon class="white--text">fas fa-mobile-alt</v-icon>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title>
							Cài Đặt App Ngay !
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link exact dark class="orange accent-2" :to="{ name: 'Donate' }">
					<v-list-item-action>
						<v-icon class="white--text">fas fa-hand-holding-usd</v-icon>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title>
							Ủng Hộ Dev
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link exact :to="{ name: 'About' }">
					<v-list-item-action>
						<v-icon>fas fa-info-circle</v-icon>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title>
							Thông Tin
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>

			<p class="text-subtitle-2 text-center mb-0 mt-2">
				Copyright &copy; {{ getYear }}
				<a target="_blank" href="https://havencode.net">Haven Code</a>
			</p>
			<p class="text-subtitle-2 text-center mb-2 ">
				Powered By
				<a href="https://danghoangphuc.com" target="_blank">Phuc Dang</a>
			</p>
		</template>
	</v-navigation-drawer>
</template>

<script>
	import moment from 'moment'

	export default {
		name: 'Drawer',
		data: () => ({
			drawer: null,
			items: [
				{
					icon: 'far fa-calendar-alt',
					routerName: 'Dashboard',
					name: 'Thời Khoá Biểu',
				},
				{
					icon: 'fas fa-tools',
					routerName: 'Icalendar',
					name: 'Chuyển Sang Icalendar',
				},
				{
					icon: 'fas fa-sync',
					routerName: 'Sync',
					name: 'Đồng Bộ Hoá',
				},
			],
		}),
		computed: {
			getYear() {
				return moment().format('YYYY')
			},
		}
	}
</script>

<style></style>
