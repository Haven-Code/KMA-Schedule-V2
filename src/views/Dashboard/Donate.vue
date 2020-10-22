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
				<!-- <v-data-table
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
				</v-data-table> -->

				<v-row justify="center">
					<v-expansion-panels accordion popout>
						<v-expansion-panel v-for="{ name, value } in items" :key="name">
							<v-expansion-panel-header>{{ name }}</v-expansion-panel-header>

							<v-expansion-panel-content>
								<v-row justify="center" class="text-center" v-html="value"></v-row>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-row>
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
					value: '<p class="text-h6">4100172376886 <br> Đặng Hoàng Phúc - Chi Nhánh Hội sở chính</h5>',
				},
				{
					name: 'Ngân Hàng Agribank:',
					value: '<p class="text-h6">1401205101015 <br> Đặng Hoàng Phúc - Chi Nhánh Hà Nội 1</p>',
				},
				{
					name: 'QR Pay',
					value: '',
				},
				{
					name: 'Paypal',
					value:
						'<a href="https://paypal.me/phuchptty" class="mb-3" target="_blank"><img src="https://img.shields.io/badge/paypal-%2300457C.svg?&style=for-the-badge&logo=paypal&logoColor=white"  style="height: 120% !important;width: auto !important;" title="Paypal" alt="Paypal"/></a>',
				},
				{
					name: 'Buy me a coffee',
					value:
						'<a href="https://www.buymeacoffee.com/phuchptty" class="ma-0 pa-0" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" style="height: 40% !important;width: auto !important;" ></a>',
				},
				{
					name: 'Ví Momo',
					value: '<img src="/assets/momo.png" alt="QR Momo"/><a href="https://nhantien.momo.vn/Gjs532xiR34" target="_blank">https://nhantien.momo.vn/Gjs532xiR34</a>',
				},
				{
					name: 'Viettel Pay',
					value: '<img src="/assets/vtpay.jpg" alt="QR Momo" style="height:35vh !important; width: auto !important"/>',
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
