<!-- @format -->

<template>
	<v-app>
		<v-container fluid class="fill-height grey lighten-3 ToS">
			<p @click.stop="returnHome" class="back hidden-md-and-up">Return Home</p>
			<v-row>
				<div class="logoHeader mx-3" @click.stop="returnHome">
					<v-img src="../assets/logo.png" class="logoImg mr-2"></v-img>
					<p class="text-h2 logoText">KMA Schedule</p>
				</div>

				<div class="content mt-3 mx-3">
					<h1>Welcome to our Privacy Policy</h1>
					<h3>Your privacy is important to us</h3>

					<p>
						It is Haven Code's policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to
						<a href="https://kma.dhpgo.com">kma.dhpgo.com</a>
						(hereinafter, "us", "we", or "kma.dhpgo.com"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy ("Privacy Policy") to explain what information may be
						collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other
						sources.
					</p>
					<p>
						This Privacy Policy, together with the Terms of service posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms of service.
					</p>
					<h2>Website Visitors</h2>
					<p>
						Like most website operators, Haven Code collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.Haven
						Code's purpose in collecting non-personally identifying information is to better understand how Haven Code's visitors use its website. From time to time, Haven Code may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in
						the usage of its website.
					</p>
					<p>
						Haven Code also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on https://kma.dhpgo.com blog posts. Haven Code only discloses logged in user and commenter IP addresses under the
						same circumstances that it uses and discloses personally-identifying information as described below.
					</p>

					<h2>Gathering of Personally-Identifying Information</h2>
					<p>
						Certain visitors to Haven Code's websites choose to interact with Haven Code in ways that require Haven Code to gather personally-identifying information. The amount and type of information that Haven Code gathers depends on the nature of the interaction. For example, we ask
						visitors who sign up for a blog at https://kma.dhpgo.com to provide a username and email address.
					</p>

					<h2>Security</h2>
					<p>
						The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot
						guarantee its absolute security.
					</p>

					<h2>Aggregated Statistics</h2>
					<p>
						Haven Code may collect statistics about the behavior of visitors to its website. Haven Code may display this information publicly or provide it to others. However, Haven Code does not disclose your personally-identifying information.
					</p>

					<h2>Cookies</h2>
					<p>
						To enrich and perfect your online experience, Haven Code uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.
					</p>
					<p>
						A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. Haven Code uses cookies to help Haven Code identify and track visitors, their usage of
						https://kma.dhpgo.com, and their website access preferences. Haven Code visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Haven Code's websites, with the drawback that certain features of Haven Code's
						websites may not function properly without the aid of cookies.
					</p>
					<p>
						By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Haven Code's use of cookies.
					</p>

					<h2>Privacy Policy Changes</h2>
					<p>
						Although most changes are likely to be minor, Haven Code may change its Privacy Policy from time to time, and in Haven Code's sole discretion. Haven Code encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site
						after any change in this Privacy Policy will constitute your acceptance of such change.
					</p>
					<h2>Credit &amp; Contact Information</h2>
					<p>
						If you have any questions about our Privacy Policy, please contact us via
						<a href="mailto:dhp@danghoangphuc.com">email</a>
						.
					</p>

					<p class="text-right mr-6"><strong>Haven Code</strong></p>
				</div>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	export default {
		name: 'PrivacyPolicy',
		methods: {
			returnHome() {
				this.$router.push({ name: 'LD' })
			},
		},
	}
</script>

<style lang="scss" scoped>
	.Tos {
		height: 100vh;
	}

	.logoHeader {
		text-align: center;
		cursor: pointer;

		.logoImg {
			width: 12vh;
			height: auto;
			display: inline-block;
		}

		.logoText {
			display: inline-block;
		}
	}

	.back {
		cursor: pointer;
	}
</style>
