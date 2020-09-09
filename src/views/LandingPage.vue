<!-- @format -->

<template>
	<v-app>
		<v-container class="bg grey lighten-4 d-flex" fluid tag="div">
			<v-row justify="center" align="center">
				<v-col cols="12" sm="10" md="8">
					<center>
						<div class="content">
							<v-img src="../assets/logo.png" class="logo" aspect-ratio="1"></v-img>

							<p class="text-h4 text-sm-h5 text-md-h2 text-lg-h1 mt-2">
								&lt;
								<strong>KMA&nbsp;</strong>
								Schedule /&gt;
								<span class="flicker">_</span>
							</p>
						</div>

						<v-btn :to="{ name: 'Login' }" color="primary" class="mt-3" large>
							<v-icon left>fas fa-user</v-icon>
							Đăng Nhập Bằng Actvn !
						</v-btn>

						<v-footer absolute class="hidden-sm-and-down text-center font-weight-medium">
							<v-col class="text-center" cols="12">
								Copyright &copy; {{ new Date().getFullYear() }} —
								<strong><a href="https://havencode.net" target="_blank">Haven Code</a></strong>
								- Powered By
								<a href="https://danghoangphuc.com" target="_blank">Phuc Dang</a>
								<br />
								<router-link :to="{ name: 'ToS' }">Term of Service</router-link>
								|
								<router-link :to="{ name: 'PP' }">Privacy Policy</router-link>
							</v-col>
						</v-footer>
					</center>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	export default {
		name: 'LandingPage',
	}
</script>

<style lang="scss" scoped>
	.logo {
		width: 20%;
		height: auto;
	}
	@keyframes flickerAni {
		25% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.flicker {
		-webkit-animation: flickerAni 1.5s infinite;
	}
	.bg {
		height: 100%;
	}
</style>

<style>
	html,
	body {
		overflow: auto;
	}
</style>
