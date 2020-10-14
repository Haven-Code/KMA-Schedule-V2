<!-- @format -->

<template>
	<v-container class="ics mt-5" fluid>
		<MaterialCard class="card mt-6 elevation-5" color="blue lighten-1">
			<template v-slot:heading>
				<div class="display-1 font-weight-light">
					Chuyển đổi sang Icalendar
				</div>

				<div class="subtitle-0 font-weight-light">
					Dùng để chuyển thời khoá biểu sang định dạng .ics, dùng để nhập vào các ứng dụng lịch !
				</div>
			</template>

			<v-card-text class="text-center">
				<v-btn large color="blue lighten-1" dark @click.prevent="convertICS()" :loading="btnLoading">
					<v-icon class="mr-2">fas fa-file-download</v-icon>
					Chuyển Đổi & Tải Xuống
				</v-btn>

				<br />

				<v-btn large color="success" class="mt-1 downloadBtn" v-if="downloadBtn" @click.prevent="downloadFile">
					<v-icon class="mr-2">fas fa-save</v-icon>
					Tải Xuống
				</v-btn>
			</v-card-text>
		</MaterialCard>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'
	import { createEvents } from 'ics'

	export default {
		name: 'Icalendar',
		components: {
			MaterialCard: () => import('../../components/MaterialCard'),
		},
		computed: {
			...mapState(['user']),
		},
		data: () => ({
			btnLoading: false,
			events: [],
			fileValue: null,
			downloadBtn: false
		}),
		methods: {
			convertLessonsToTime(lessons) {
				let time = {
					start: '',
					end: '',
				}
				switch (lessons) {
					case '1,2,3':
						time = {
							start: '7:01',
							end: '9:25',
						}
						break
					case '4,5,6':
						time = {
							start: '9:35',
							end: '11:59',
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
							start: '18:01',
							end: '21:15',
						}
						break
					case '7,8,9,10':
						time = {
							start: '12:30',
							end: '15:50',
						}
						break
					default:
						time = {
							start: '',
							end: '',
						}
				}
				return time
			},
			convertICS() {
				this.downloadBtn = false

				this.user.userSchedule.forEach((ch, index) => {
					let title = ch.subjectName
					let des = `Tiết ${ch.lesson} \n Lớp: ${ch.className} \n Giáo Viên: ${ch.teacher}`
					let location = ch.room
					let lessonTime = this.convertLessonsToTime(ch.lesson)
					let tmStart = moment(lessonTime.start, 'hh:mm')
					let tmEnd = moment(lessonTime.end, 'hh:mm')
					let date = moment(ch.day, 'DD/MM/YYYY')
					this.events.push({
						productId: 'KMASchedulePoweredByDHP',
						uid: index + 1 + '@kma.dhpgo.com',
						title: title,
						description: des,
						location: location,
						start: [date.format('YYYY'), date.format('MM'), date.format('DD'), tmStart.format('hh'), tmStart.format('mm')],
						end: [date.format('YYYY'), date.format('MM'), date.format('DD'), tmEnd.format('hh'), tmEnd.format('mm')],
					})
				})
				const { error, value } = createEvents(this.events)
				if (error) {
					console.log('ERROR: ', error)
				} else {
					this.fileValue = value
				}

				console.log(value)
				
				this.btnLoading = false
				this.downloadBtn = true
			},
			downloadFile() {
				// console.log(this.$ics.calendar())
				var element = document.createElement('a')
				element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(this.fileValue))
				element.setAttribute('download', this.user.userData.displayName + '-' + this.user.userData.studentCode)
				element.style.display = 'none'
				document.body.appendChild(element)
				element.click()
				document.body.removeChild(element)
			},
		},
		created(){
			document.title = "Chuyển Đổi File Icalendar | KMA Schedule"
		}
	}
</script>

<style lang="scss" scoped>
	.ics {
		overflow-x: hidden;
	}
</style>
