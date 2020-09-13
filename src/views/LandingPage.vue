<!-- @format -->

<template>
	<v-app>
		<v-container class="bg d-flex" fluid tag="div">

			<v-row justify="center" align="center" class="content">
				<v-col cols="12" sm="10" md="8">
					<center>
						<div class="content">
							<v-img src="../assets/logo_glow.png" class="logo" aspect-ratio="1"></v-img>

							<p class="text-h4 glow grey--text text--lighten-4 text-sm-h5 text-md-h2 text-lg-h1 mt-4">
								&lt;
								<strong>KMA&nbsp;</strong>
								Schedule /&gt;
								<span class="flicker">_</span>
							</p>
						</div>

						<v-btn :to="{ name: 'Login' }" color="purple lighten-3" elevation="1" dark class="mt-3" large>
							<v-icon left>fas fa-user</v-icon>
							Đăng Nhập Bằng Actvn !
						</v-btn>

						<v-footer absolute color="transparent" class="hidden-sm-and-down text-center font-weight-medium footer white--text">
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
	/* eslint-disable */

	export default {
		name: 'LandingPage',
	}
</script>

<style lang="scss" scoped>
	.glow {
		font-size: 80px;
		color: #fff;
		text-align: center;
		// -webkit-animation: glow 3s ease-in-out infinite alternate;
		// -moz-animation: glow 3s ease-in-out infinite alternate;
		// animation: glow 3s ease-in-out infinite alternate;
		// transform: translateZ(0);
		// -webkit-transform: translateZ(0);
		// -ms-transform: translateZ(0);
		// will-change: transform;
		text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
	}

	@keyframes glow {
		from {
			text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
		}
		to {
			text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
		}
	}

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
		-webkit-animation: flickerAni 2s infinite;
		animation: flickerAni 2s infinite;
	}

	.bg {
		height: 100%;
		// background: linear-gradient(to left bottom, #caf0f8 0%, #0096c7 100%);
		// background: -moz-linear-gradient(to left bottom, #caf0f8 0%, #0096c7 100%);
		// background: -o-linear-gradient(to left bottom, #caf0f8 0%, #0096c7 100%);
		// background: -ms-linear-gradient(to left bottom, #caf0f8 0%, #0096c7 100%);
		// background: -webkit-linear-gradient(top right, #caf0f8 0%, #0096c7 100%);
		background-image: url('/assets/ld_bg_comp.jpg');
		background-repeat: no-repeat;
		background-size: cover;

		.blur {
			filter: blur(8px);
			-webkit-filter: blur(8px);
			position: relative;
			z-index: -1;
		}
	}

	.footer {
		a {
			color: #fff
		}
	}
</style>

<style>
	html,
	body {
		overflow: auto;
	}
</style>
