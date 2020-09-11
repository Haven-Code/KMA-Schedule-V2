<!-- @format -->

<template>
	<v-container class="user" fluid>
		<MaterialCard class="v-card-profile userCard" color="blue lighten-2" :avatar="generateAvatar">
			<v-card-text class="text-center">
				<h4 class="display-1 font-weight-light mb-3" :class="config.darkTheme ? `white--text` : `black--text`">
					{{ user.userData.displayName }}
				</h4>

				<h6 class="text-h6 mb-1" :class="config.darkTheme ? `while--text` : `grey--text`">
					{{ user.userData.studentCode }}
				</h6>
				
				<v-data-table :headers="headers" hide-default-header hide-default-footer :items="items" class="elevation-0 text-center table ma-auto">
					<template v-slot:[`item.value`]="{ item }">
						<span v-html="item.value"></span>
					</template>
				</v-data-table>
			</v-card-text>
		</MaterialCard>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'

	export default {
		name: 'User',
		components: {
			MaterialCard: () => import('../../components/MaterialCard'),
		},
		computed: {
			...mapState(['user', 'config']),
			items() {
				let data = [
					{
						name: 'Giới Tính:',
						value: this.user.userData.gender,
					},
					{
						name: 'Ngày Sinh:',
						value: this.user.userData.birthday,
					},
					{
						name: 'Ngành Học:',
						value: this.checkSubject
					},
					{
						name: 'Khoá Học',
						value: this.checkStudyYear
					},
					{
						name: 'Số Ca Đã Học / Tổng Số Ca (Trong kỳ hiện tại):',
						value: this.countStudied + ' / ' + this.user.userSchedule.length + ' ( Còn lại ' + (this.user.userSchedule.length - this.countStudied) + ' ca )',
					},
				]
				return data
			},
			generateAvatar() {
				let encodedName = encodeURIComponent(this.user.userData.displayName)
				let url = 'https://ui-avatars.com/api/?background=42A5F5&color=fff&size=128&name=' + encodedName
				return url
			},
			countStudied() {
				let count = 0;

				this.user.userSchedule.forEach( item => {
					if (moment(item.day,'DD/MM/YYYY').isBefore(moment())){
						count++
					}
				})

				return count
			},
			checkSubject(){
				let code = this.user.userData.studentCode.substr(0,2).toLowerCase()
				let subject = ''
				
				switch (code) {
					case 'at':
						subject = 'An Toàn Thông Tin'
						break;
					case 'ct':
						subject = 'Công Nghệ Thông Tin'
						break;
					case 'dt':
						subject = 'Điện Tử - Viễn Thông'
						break;
					default:
						subject = 'Không Rõ'
				}

				return subject
			},
			checkStudyYear(){
				let course = this.user.userData.studentCode.substr(0,4).toUpperCase()
				let courseNumber = this.user.userData.studentCode.substr(2,2)

				console.log(courseNumber)
				
				let code = this.user.userData.studentCode.substr(0,2).toLowerCase()
				let yearNow = moment().format('YY')

				let year = ''
				
				switch (code) {
					case 'at':
						year = Number(yearNow) - Number(courseNumber) - 2
						break;
					case 'ct':
						year = Number(yearNow) - Number(courseNumber) - 14
						break;
					case 'dt':
						year = Number(yearNow) - Number(courseNumber) - 15
						break;
					default:
						year = ''
				}

				return `${course} ( Năm thứ ${year} )`

			}
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
		}),
	}
</script>

<style lang="scss" scoped>
	.userCard {
		margin-top: 8vh;
	}
</style>
