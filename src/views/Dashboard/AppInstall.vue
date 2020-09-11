<!-- @format -->

<template>
	<v-container class="mt-5" fluid>
		<MaterialCard class="card mt-6" color="blue lighten-1">
			<template v-slot:heading>
				<div class="display-1 font-weight-light">
					Cài Đặt App
				</div>
			</template>

			<v-card-text>
				<v-tabs
					v-model="tab"
					class="elevation-0"
					grow
					icons-and-text
					center-active
				>
					<v-tabs-slider></v-tabs-slider>

					<v-tab href="#tab-pwa-android">
						Android PWA
						<v-icon>fab fa-chrome</v-icon>
					</v-tab>

					<v-tab href="#tab-pwa-ios">
						IOS PWA
						<v-icon>fab fa-safari</v-icon>
					</v-tab>

					<v-tab href="#tab-native-android">
						Android APK
						<v-icon>fab fa-android</v-icon>
					</v-tab>

					<v-tab href="#tab-pwa-desktop">
						Desktop PWA
						<v-icon>fab fa-windows</v-icon>
					</v-tab>

					<!-- AHIHIHIHI TAB VALUE -->

					<v-tab-item value="tab-pwa-android">
						<v-card tile flat>
							<v-card-text>
								<div class="installBtn text-center">
									<v-btn large dark color="primary" elevation="0" class="mt-4" @click.prevent.stop="install">
										<v-icon class="mr-2">fas fa-plus-circle</v-icon>
										Cài Đặt Ngay
									</v-btn>
								</div>

								<div class="tutorial">

								</div>
							</v-card-text>
						</v-card>
					</v-tab-item>

					<v-tab-item value="tab-pwa-ios">
						<v-card tile flat>
							<v-card-text>
								<div class="installBtn text-center">
									<v-btn large dark color="primary" elevation="0" class="mt-4" @click.prevent.stop="install">
										<v-icon class="mr-2">fas fa-plus-circle</v-icon>
										Cài Đặt Ngay
									</v-btn>
								</div>
							</v-card-text>
						</v-card>
					</v-tab-item>

					<v-tab-item value="tab-native-android">
						<v-card tile flat>
							<v-card-text>
								<div class="installBtn text-center">
									<v-btn large dark color="primary" elevation="0" class="mt-4" @click.prevent.stop="install">
										<v-icon class="mr-2">fas fa-download</v-icon>
										Tải Xuống
									</v-btn>
								</div>
							</v-card-text>
						</v-card>
					</v-tab-item>

					<v-tab-item value="tab-pwa-desktop">
						<v-card tile flat>
							<v-card-text>
								<div class="installBtn text-center">
									<v-btn large dark color="primary" elevation="0" class="mt-4" @click.prevent.stop="install">
										<v-icon class="mr-2">fas fa-plus-circle</v-icon>
										Cài Đặt Ngay
									</v-btn>
								</div>
							</v-card-text>
						</v-card>
					</v-tab-item>
				</v-tabs>
			</v-card-text>
		</MaterialCard>
	</v-container>
</template>

<script>
	import swal from 'sweetalert'

	export default {
		name: 'AppInstall',
		components: {
			MaterialCard: () => import('../../components/MaterialCard'),
		},
		data: () => ({
			tab: null,
			deferredPrompt: null,
		}),
		methods: {
			install() {
				this.deferredPrompt.prompt()
				this.deferredPrompt.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						console.log('User accepted the install prompt')
					} else {
						console.log('User dismissed the install prompt')
						swal({
							title: 'Oh :(',
							icon: 'error',
							text: 'Bạn Có Thể Thử Lại Sau !',
						})
					}
				})
			},
		},
		created() {
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault()
				this.deferredPrompt = e
			})
			window.addEventListener('appinstalled', () => {
				console.log('App install success !')
				this.show = false
				this.deferredPrompt = null
			})
		},
	}
</script>

<style></style>
