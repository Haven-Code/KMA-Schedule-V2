<!-- @format -->

<template>
	<v-container class="about mt-5" fluid>
		<MaterialCard class="card mt-6 elevation-5" color="blue lighten-1">
			<template v-slot:heading>
				<div class="display-1 font-weight-light">
					Thông Tin Ứng Dụng
				</div>
			</template>

			<v-card-text>
				<v-data-table
					:headers="headers"
					:items="items"
					item-key="name"
					class="elevation-0 ma-auto text-center"
					hide-default-header
					hide-default-footer
				>
					<template v-slot:[`item.value`]="{ item }">
						<span v-html="item.value"></span>
					</template>
				</v-data-table>
			</v-card-text>
		</MaterialCard>
	</v-container>
</template>

<script>
	export default {
		name: 'About',
		components: {
			MaterialCard: () => import('../../components/MaterialCard'),
		},
		data: () => ({
			headers: [
				{
					value: 'name',
				},
				{
					value: 'value',
				},
			],
			items: [
				{
					name: 'Tên Ứng Dụng',
					value: 'KMA Schedule',
				},
				{
					name: 'Phiên Bản',
					value: process.env.VUE_APP_VERSION,
				},
				{
					name: 'Viết Bởi',
					value:
						'<a href="https://danghoangphuc.com" target="_blank">Đặng Hoàng Phúc (AT16)</a> [<a href="https://havencode.net" target="_blank">Haven Code</a>]',
				},
				{
					name: 'Năm Phát Hành',
					value: '2020',
				},
				{
					name: 'Framework',
					value: 'Vue.js 2 - VueX - Vue-Router - Vuetify',
				},
				{
					name: 'Source Code',
					value: '<a href="https://github.com/Haven-Code/KMA-Schedule-Remaster" target="_blank">Github</a>',
				},
				{
					name: 'Server',
					value: 'Netlify - Firebase - AWS S3',
				},
				{
					name: 'Tương Thích',
					value: '<strong>Bất kỳ HĐH sử dụng Chrome 80 trở lên. Riêng IOS chạy tốt nhất từ IOS 11.3 trở lên !</strong>',
				},
				{
					name: 'Điều Khoản Sử Dụng',
					value: `<a href="/termofservice" target="_blank">Tos</a>`,
				},
				{
					name: 'Chính Sách Quyền Riêng Tư',
					value: '<a href="/privacypolicy" target="_blank">Privacy Policy</a>',
				},
			],
		}),
	}
</script>

<style></style>
