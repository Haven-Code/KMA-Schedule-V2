<!-- @format -->

<template>
	<v-navigation-drawer v-model="drawer" app dark :color="getThemeColor">
		<v-list dense nav>
			<v-list-item :to="{ name: 'User' }">
				<v-list-item-avatar class="align-self-center" color="white" contain>
					<v-img :src="generateAvatar" />
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title class="text-body-2">
						{{ user.userData.displayName }}
						<br />
						{{ user.userData.studentCode }}
					</v-list-item-title>
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
			<v-list expand nav>
				<v-list-item-group mandatory>
					<v-list-item exact v-for="(item, index) in appenItems" :key="index" :to="{ name: item.routerName }" :class="item.bgColor">
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

			<p class="text-subtitle-2 text-center mb-0 mt-2 white--text">
				Copyright &copy; {{ getYear }}
				<a target="_blank" href="https://havencode.net" class=" white--text">Haven Code</a>
			</p>
			<p class="text-subtitle-2 text-center mb-2 white--text">
				Powered By
				<a href="https://danghoangphuc.com" class=" white--text" target="_blank">Phuc Dang</a>
			</p>
		</template>
	</v-navigation-drawer>
</template>

<script>
	import moment from 'moment'
	import { mapState } from 'vuex'

	export default {
		name: 'Drawer',
		computed: {
			...mapState(['user', 'config']),
			getYear() {
				return moment().format('YYYY')
			},
			generateAvatar() {
				let encodedName = encodeURIComponent(this.user.userData.displayName)
				let url = 'https://ui-avatars.com/api/?background=42A5F5&color=fff&size=128&name=' + encodedName
				return url
			},
			getThemeColor() {
				let color = ''

				if (!this.config.darkTheme) {
					color = 'grey darken-1'
				} else {
					color = ''
				}
				return color
			},
		},
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
			appenItems: [
				{
					icon: 'fas fa-mobile-alt',
					routerName: 'AppInstall',
					name: 'Cài Đặt App',
					bgColor: 'green lighten-1',
				},
				{
					icon: 'fas fa-hand-holding-usd',
					routerName: 'Donate',
					name: 'Ủng Hộ Dev',
					bgColor: 'orange accent-2',
				},
				{
					icon: 'fas fa-info-circle',
					routerName: 'About',
					name: 'Thông Tin',
				},
			],
		}),
	}
</script>

<style></style>
