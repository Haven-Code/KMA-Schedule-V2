<!-- @format -->

<template>
	<v-container class="sync mt-5" fluid>
		<MaterialCard class="card mt-6" color="blue lighten-1">
			<template v-slot:heading>
				<div class="display-1 font-weight-light">
					Đồng Bộ Hoá
				</div>

				<div class="subtitle-0 font-weight-light">
					Đồng Bộ Lịch Với Google Lịch & Microsoft Outlook !
				</div>
			</template>

			<v-card-text class="text-center">
				<v-row>
					<v-col md="6" sm="12">
						<v-btn v-if="!authorized" color="red" dark @click.stop="handleAuthClick">
							<v-icon class="mr-2">fab fa-google</v-icon>
							Kết Nối Với Google
						</v-btn>

						<!-- <center><v-img v-if="!authorized" @click.stop="handleAuthClick" src="../../assets/btn_google_signin_dark_normal_web@2x.png" class="signInWithGoogle"></v-img></center> -->

						<v-btn v-if="authorized" color="red" dark @click.stop="handleSignoutClick" :loading="google.loadingBtn">
							<v-icon class="mr-2">fas fa-times</v-icon>
							Ngắt Kết Nối Với Google
						</v-btn>
						<br />

						<v-btn v-if="authorized" color="primary" class="mt-2" @click="importData" :loading="google.loadingBtn">
							<i class="fas fa-file-import fa-lg mr-2"></i>
							Nhập Thời Khoá Biểu
						</v-btn>
					</v-col>

					<v-col md="6" sm="12">
						<v-btn v-if="!ms.authorized" color="primary" dark @click.stop="msSignIn">
							<v-icon class="mr-2">fab fa-microsoft</v-icon>
							Liên Kết Với Mirosoft
						</v-btn>
						<v-btn v-if="ms.authorized" color="primary" dark @click.stop="msSignOut" :loading="ms.loadingBtn">
							<v-icon class="mr-2">fas fa-times</v-icon>
							Ngắt Kết Nối Microsoft
						</v-btn>

						<p v-if="ms.authorized" class="mt-2">Chào {{ ms.account.name }} !</p>

						<v-btn v-if="ms.authorized" dark color="amber darken-2" class="" @click="msImportData" :loading="ms.loadingBtn">
							<v-icon class="mr-2">fas fa-file-import</v-icon>
							Nhập Thời Khoá Biểu
						</v-btn>
					</v-col>
				</v-row>

				<p class="text-subtitle-2 mt-3">Console:</p>
				<div class="console grey lighten-2 mt-5 ma-2 px-2 pt-1 black--text text-left text-body-2" v-html="console"></div>
			</v-card-text>
		</MaterialCard>
	</v-container>
</template>

<script>
	/* eslint-disable */

	import { mapState } from 'vuex'
	import swal from 'sweetalert'
	import moment from 'moment'

	const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
	const SCOPES =
		'email profile openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events'

	export default {
		name: 'Sync',
		components: {
			MaterialCard: () => import('../../components/MaterialCard'),
		},
		data: () => ({
			api: undefined,
			authorized: false,
			google: {
				loadingBtn: false,
			},
			ms: {
				authorized: false,
				api: undefined,
				account: null,
				loadingBtn: false,
			},
			console: '<p>Chào bạn !</p>',
		}),
		computed: {
			...mapState(['user']),
		},
		created() {
			//Loading Google Client
			this.api = gapi
			this.handleClientLoad()
			//Loading Microsoft Library
			const msalConfig = {
				auth: {
					clientId: process.env.VUE_APP_MS_CLIENT_ID,
					redirectUri: process.env.VUE_APP_MS_REDIRECT_URL,
				},
				cache: {
					cacheLocation: 'sessionStorage',
					storeAuthStateInCookie: false,
					forceRefresh: false,
				},
			}
			const msalClient = new Msal.UserAgentApplication(msalConfig)
			this.ms.api = msalClient
			if (msalClient.getAccount() && !msalClient.isCallback(window.location.hash)) {
				this.ms.account = msalClient.getAccount()
				this.ms.authorized = true
			}
		},
		methods: {
			handleClientLoad() {
				this.api.load('client:auth2', this.initClient)
			},
			initClient() {
				this.api.client
					.init({
						apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
						clientId: process.env.VUE_APP_GOOGLE_PUBLIC_KEY,
						discoveryDocs: DISCOVERY_DOCS,
						scope: SCOPES,
					})
					.then((_) => {
						// Listen for sign-in state changes.
						this.api.auth2.getAuthInstance().isSignedIn.listen(this.authorized)
					})
			},
			handleAuthClick(event) {
				this.api.auth2
					.getAuthInstance()
					.signIn()
					.then((_) => {
						this.authorized = true
						swal({
							title: 'Connect Success !',
							icon: 'success',
						})
					})
			},
			handleSignoutClick(event) {
				this.api.auth2
					.getAuthInstance()
					.signOut()
					.then((_) => {
						this.authorized = false
						swal({
							title: 'Disconnect Success !',
							icon: 'success',
						})
					})
			},
			generateUniqueID() {
				return Math.floor(Math.random() * 10000)
			},
			convertLessonsToTime(lessons) {
				let time = {
					start: '',
					end: '',
				}
				switch (lessons) {
					case '1,2,3':
						time = {
							start: '07:00',
							end: '09:25',
						}
						break
					case '4,5,6':
						time = {
							start: '09:35',
							end: '12:00',
						}
						break
					case '7,8,9':
						time = {
							start: '12:30',
							end: '14:55',
						}
						break
					case '10,11,12':
						time = {
							start: '15:05',
							end: '17:30',
						}
						break
					case '13,14,15,16':
						time = {
							start: '18:00',
							end: '21:15',
						}
						break
				}
				return time
			},
			clearConsole() {
				this.console = '<p>Chào Bạn !</p>'
			},
			importData() {
				if (!this.user.userSchedule) {
					return swal({
						title: 'Error !',
						icon: 'error',
						text: 'List TKB Rỗng !',
					})
				}
				//clear console
				this.clearConsole()
				this.google.loadingBtn = true
				// Create Calendar
				let stuYear = moment().format('YYYY') + ' - ' + (parseInt(moment().format('YYYY')) + 1)
				let ID = this.generateUniqueID()
				this.api.client.calendar.calendars
					.insert({
						resource: {
							summary: `KMA Schedule ${stuYear} ${ID}`,
							description: `TKB Khoá Học ${stuYear} \nID: ${ID} \nTạo Lúc: ${moment().format('DD/MM/YYYY')} `,
							timeZone: 'Asia/Ho_Chi_Minh',
						},
					})
					.then((res) => {
						// console.log(res.result.id)
						this.console += `<p class="success--text">[GOOGLE] --> Tạo Lịch Mới Thành Công ! Tên: KMA Schedule ${stuYear} ${ID}</p>`
						const batch = this.api.client.newBatch()
						this.console += `<p class="primary--text">[GOOGLE] --> Chuẩn bị lịch học !</p>`
						this.user.userSchedule.forEach((a, index) => {
							// console.log('Satrt Import Insert Event: ', index)
							let start =
								moment(a.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T' + this.convertLessonsToTime(a.lesson).start + ':00.000+07:00'
							let end =
								moment(a.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T' + this.convertLessonsToTime(a.lesson).end + ':00.000+07:00'
							let event = {
								summary: a.subjectName,
								location: a.room,
								description: `Tiết: ${a.lesson} \nLớp: ${a.className} \nGiáo Viên: ${a.teacher}`,
								start: {
									dateTime: start,
									timeZone: 'Asia/Ho_Chi_Minh',
								},
								end: {
									dateTime: end,
									timeZone: 'Asia/Ho_Chi_Minh',
								},
							}
							batch.add(
								this.api.client.calendar.events.insert({
									calendarId: res.result.id,
									resource: event,
								})
							)
							// console.log('Finish Insert Event: ', index)
						})
						this.console += `<p class="success--text">[GOOGLE] --> Chuẩn bị xong !</p>`
						this.console += `<p class="primary--text">[GOOGLE] --> Bắt đầu gửi !</p>`
						batch
							.then(() => {
								this.console += `<p class="success--text">[GOOGLE] --> <strong>Đồng bộ thành công ! </strong></p>`
								console.log('all jobs done!!!')
							})
							.catch((err) => {
								this.console += `<p class="danger--text">[GOOGLE] --> <strong>Đồng bộ thất bại ! </strong></p> <p> ${err} </p>`
								throw new Error(err)
							})
					})
					.catch((err) => {
						this.console += `<p class="danger--text">[GOOGLE] --> Tạo Lịch Lỗi !</p> <p> ${err} </p>`
						throw new Error(err)
					})
				this.google.loadingBtn = false
			},
			// Microsoft Auth
			async msSignIn() {
				const loginRequest = {
					scopes: ['openid', 'profile', 'user.read', 'calendars.readwrite'],
				}
				try {
					await this.ms.api.loginPopup(loginRequest)
					console.log('id_token acquired at: ' + new Date().toString())
					if (this.ms.api.getAccount()) {
						this.ms.account = this.ms.api.getAccount()
						this.ms.authorized = true
					}
				} catch (error) {
					console.log(error)
				}
			},
			msSignOut() {
				this.ms.api.logout()
				this.ms.authorized = false
			},
			async msImportData() {
				const options = new MicrosoftGraph.MSALAuthenticationProviderOptions(['user.read', 'calendars.readwrite'])
				const authProvider = new MicrosoftGraph.ImplicitMSALAuthenticationProvider(this.ms.api, options)
				const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider })
				let stuYear = moment().format('YYYY') + ' - ' + (parseInt(moment().format('YYYY')) + 1)
				let ID = this.generateUniqueID()
				this.clearConsole()
				this.ms.loadingBtn = true
				try {
					let calendar = await graphClient.api('/me/calendars').post({
						Name: `KMA Schedule ${stuYear} ${ID}`,
					})
					this.console += `<p class="success--text">[MICROSOFT] --> Tạo Lịch Thành Công ! Tên: KMA Schedule ${stuYear} ${ID} </p>`
					this.user.userSchedule.forEach(async (a, index) => {
						setTimeout(async () => {
							let start = moment(a.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T' + this.convertLessonsToTime(a.lesson).start + ':00'
							let end = moment(a.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T' + this.convertLessonsToTime(a.lesson).end + ':00'
							let event = {
								subject: a.subjectName,
								body: {
									contentType: 'HTML',
									content: `Tiết: ${a.lesson} <br>Lớp: ${a.className} <br>Giáo Viên: ${a.teacher}`,
								},
								start: {
									dateTime: start,
									timeZone: 'Asia/Bangkok',
								},
								end: {
									dateTime: end,
									timeZone: 'Asia/Bangkok',
								},
								location: {
									displayName: a.room,
									address: {
										city: 'Hà Nội',
										countryOrRegion: 'Việt Nam',
										postalCode: '100000',
										state: 'Thanh Xuân',
										street: '141 Chiến Thắng',
									},
								},
							}
							let eventCall = await graphClient.api(`/me/calendars/${calendar.id}/events`).post(event)
							this.console += `<p class="success--text">[MICROSOFT] --> Nhập Event ${index + 1} ${a.subjectName} Thành Công !</p>`
							if (index + 1 == this.user.userSchedule.length) {
								this.console += `<p class="success--text">[MICROSOFT] --> <strong>Đồng Bộ Hoá Xong</strong></p>`
								this.ms.loadingBtn = false
							}
						}, 500 * index)
					})
				} catch (err) {
					this.console += `<p class="danger--text">[MICROSOFT] --> Tạo Lịch Thất Bại Hoặc Nhập Thất Bại</p>`
					this.ms.loadingBtn = false
				}
			},
		},
		mounted() {
			let firstTime = true
			let container = document.getElementsByClassName('console')
			if (firstTime) {
				container.scrollTop = container.scrollHeight
				firstTime = false
			} else if (container.scrollTop + container.clientHeight === container.scrollHeight) {
				container.scrollTop = container.scrollHeight
			}
		},
	}
</script>

<style lang="scss" scoped>
	.console {
		height: 30vh;
		border-radius: 10px 10px 10px 10px;
		overflow: auto;
	}
</style>

<style>
	.swal-modal {
		font-family: Helvetica;
	}
</style>
