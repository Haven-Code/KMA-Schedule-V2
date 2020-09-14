<!-- @format -->

<template>
	<v-app>
		<v-container fluid class="fill-height light-blue lighten-3">
			<v-row justify="center" align="center">
				<v-col cols="12" sm="10" md="8">
					<MaterialCard>
						<template v-slot:heading>
							<div class="display-2 font-weight-light">
								Đăng Nhập
							</div>

							<div class="subtitle-1 font-weight-light">
								Sử dụng tài khoản ACTVN !
							</div>
						</template>

						<v-card-text>
							<v-form>
								<v-text-field label="Mã Sinh Viên" name="login" prepend-icon="fas fa-user" type="text" v-model="username" required :disabled="disable" @keydown.enter="doLogin"></v-text-field>

								<v-text-field id="password" label="Mật Khẩu" name="password" counter prepend-icon="fas fa-user-lock" type="password" required v-model="password" :disabled="disable" @keydown.enter="doLogin"></v-text-field>
							</v-form>
						</v-card-text>

						<v-card-actions>
							<v-btn color="primary" @click.prevent="doLogin" :loading="submitBtnLoading" block depressed>
								<v-icon class="mr-2">fas fa-sign-in-alt</v-icon>
								Login
							</v-btn>
						</v-card-actions>
					</MaterialCard>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	import MaterialCard from '../components/MaterialCard'
	import axios from 'axios'
	import swal from 'sweetalert'
	import { mapState } from 'vuex'

	export default {
		name: 'Login',
		components: {
			MaterialCard,
		},
		data: () => ({
			username: '',
			password: '',
			source: '',
			submitBtnLoading: false,
			disable: false,
		}),
		computed: {
			...mapState(['user']),
		},
		methods: {
			async doLogin() {
				this.disable = true
				if (this.username === '' || this.password === '') {
					this.disable = false
					return swal({
						title: 'Error !',
						icon: 'error',
						text: 'Tên Đăng Nhập / Mật Khẩu Không Được Trống !',
					})
				}
				this.submitBtnLoading = true
				let param = {
					username: this.username,
					password: this.password,
				}
				try {
					let res = await axios.post(process.env.VUE_APP_API_LOGIN_URL, param)
					// console.log(res.data)
					let data = res.data
					if (data.code === 'ERROR') {
						if (data.message.name == 'TransformError') {
							this.disable = false
							this.submitBtnLoading = false
							return swal({
								title: 'Error !',
								icon: 'error',
								text: `Sai Tài Khoản Hoặc Mật Khẩu ! ${data.message.message}`,
							})
						} else {
							this.disable = false
							this.submitBtnLoading = false
							return swal({
								title: 'Response Error !',
								icon: 'error',
								text: 'Server Error ! Please Wait !',
							})
						}
					} else if (data.code === 'SUCCESS') {
						// console.log(data.data)
						this.$store.commit('user/SET_USER', data.data)
						swal({
							title: 'Login Success !',
							icon: 'success',
							text: `Chào ${data.data.studentInfo.displayName} (${data.data.studentInfo.studentCode}) !`,
						})
						this.$router.replace({ name: 'Dashboard' })
					}
				} catch (err) {
					this.disable = false
					swal({
						title: 'Error !',
						icon: 'error',
						text: 'Server Error ! Please Wait !' + err,
					})
					console.log('ERROR: ', err)
				}
				this.submitBtnLoading = false
			},
		},
		mounted() {
			document.title = 'Đăng Nhập | KMA Schedule'
		},
	}
</script>

<style lang="scss">
	.swal-modal {
		font-family: Helvetica;
	}
</style>