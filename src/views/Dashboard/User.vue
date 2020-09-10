<!-- @format -->

<template>
	<v-container class="user" fluid>
		<MaterialCard class="card mt-6" color="blue lighten-1">
			<template v-slot:heading>
				<div class="display-1 font-weight-light">
					Thông Tin Sinh Viên
				</div>
			</template>

			<v-card-text class="text-center"></v-card-text>
		</MaterialCard>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'User',
		components: {
			MaterialCard: () => import('../../components/MaterialCard'),
		},
		computed: {
			...mapState(['user']),
		},
	}
</script>

<style></style>
