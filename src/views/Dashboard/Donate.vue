<!-- @format -->

<template>
	<v-container class="mt-5" fluid>
		<MaterialCard class="card mt-6 elevation-5" color="blue lighten-1">
			<template v-slot:heading>
				<div class="display-1 font-weight-light">
					Ủng Hộ Nhà Phát Triển
				</div>

				<div class="text-subtitle-1 font-weight-light">
					Donate sẽ không thể hoàn trả ! Vui lòng nghĩ kỹ trước khi làm !
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
						<span v-html="item.value" class="mt-2"></span>
						<v-img v-if="item.image" :src="item.image" class="qr mt-2 mb-2"></v-img>
					</template>
				</v-data-table>
			</v-card-text>
		</MaterialCard>
	</v-container>
</template>

<script>
	export default {
		name: 'Donate',
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
					name: 'Ngân Hàng MB Bank: ',
					value: '4100172376886 <br> Đặng Hoàng Phúc - Chi Nhánh Hội sở chính',
				},
				{
					name: 'Ngân Hàng Agribank:',
					value: '1401205101015 <br> Đặng Hoàng Phúc - Chi Nhánh Hà Nội 1',
				},
				{
					name: 'QR Pay',
					value: '',
				},
				{
					name: 'Paypal',
					value: '<a href="https://paypal.me/phuchptty" target="_blank"><img src="https://img.shields.io/badge/paypal-%2300457C.svg?&style=for-the-badge&logo=paypal&logoColor=white" title="Paypal" alt="Paypal"/></a>',
				},
				{
					name: 'Buy me a coffee',
					value: '<a href="https://www.buymeacoffee.com/phuchptty" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" style="height: 90% !important;width: auto !important;" ></a>',
				},
				{
					name: 'Ví Momo',
					value: '<a href="https://nhantien.momo.vn/Gjs532xiR34" target="_blank">https://nhantien.momo.vn/Gjs532xiR34</a>',
					image: '../../assets/momo.png',
				},
				{
					name: 'Viettel Pay',
					image: '../../assets/vtpay.jpg',
				},
			],
		}),
	}
</script>

<style lang="scss">
	.qr {
		width: 20vw;
	}
</style>
