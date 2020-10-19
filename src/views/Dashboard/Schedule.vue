<!-- @format -->

<template>
	<v-row class="fill-height scheduleView">
		<v-col class="hidden-sm-and-down">
			<v-overlay absolute :value="overlay" opacity="0.8">
				<Spinner />
			</v-overlay>

			<v-sheet height="8.5vh">
				<v-toolbar flat>
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined class="mr-4" @click="setToday" v-bind="attrs" v-on="on">
								Về Hôm Nay
							</v-btn>
						</template>
						<span>Về Trang Có Ngày Hôm Nay</span>
					</v-tooltip>

					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn fab text small @click="prev" v-bind="attrs" v-on="on">
								<v-icon small>mdi-chevron-left</v-icon>
							</v-btn>
						</template>
						<span>Trang Trước</span>
					</v-tooltip>

					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn fab text small @click="next" v-bind="attrs" v-on="on">
								<v-icon small>mdi-chevron-right</v-icon>
							</v-btn>
						</template>
						<span>Trang Sau</span>
					</v-tooltip>

					<v-toolbar-title v-if="$refs.calendar">
						{{ translateMonth($refs.calendar.title) }}
					</v-toolbar-title>

					<v-spacer></v-spacer>

					<!-- <v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined class="mr-4" color="grey darken-2" v-bind="attrs" v-on="on">
								Đồng Bộ Lại
							</v-btn>
						</template>
						<span>Comming Soon</span>
					</v-tooltip> -->

					<!-- <v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined class="mr-4" v-bind="attrs" v-on="on">
								Thêm Sự Kiện
							</v-btn>
						</template>
						<span>Thêm Sự Kiện Vào Lịch</span>
					</v-tooltip> -->

					<v-menu bottom right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined v-bind="attrs" v-on="on">
								<span>{{ dView.calendar.typeToLabel[dView.calendar.type] }}</span>
								<v-icon right>mdi-menu-down</v-icon>
							</v-btn>
						</template>

						<v-list>
							<v-list-item @click="dView.calendar.type = 'day'">
								<v-list-item-title>Ngày</v-list-item-title>
							</v-list-item>
							<v-list-item @click="dView.calendar.type = 'week'">
								<v-list-item-title>Tuần</v-list-item-title>
							</v-list-item>
							<v-list-item @click="dView.calendar.type = 'month'">
								<v-list-item-title>Tháng</v-list-item-title>
							</v-list-item>
							<v-list-item @click="dView.calendar.type = '4day'">
								<v-list-item-title>4 ngày</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar>
			</v-sheet>

			<v-sheet height="80vh" class="fill-height">
				<v-calendar
					ref="calendar"
					v-model="dView.calendarFocus"
					:type="dView.calendar.type"
					:event-overlap-mode="dView.calendar.mode"
					:event-overlap-threshold="30"
					:short-months="false"
					:short-weekdays="false"
					color="blue lighten-2"
					:event-color="getEventColor"
					:events="dView.eData"
					:weekdays="dView.calendar.weekdays"
					@click:event="showEvent"
				></v-calendar>

				<v-menu
					v-model="dView.calendarEventDetail.selectedOpen"
					:close-on-content-click="false"
					:activator="dView.calendarEventDetail.selectedElement"
					offset-x
				>
					<v-card color="" min-width="30vh" flat style="opacity: 0.95">
						<v-toolbar :color="dView.calendarEventDetail.selectedEvent.color" dark>
							<v-toolbar-title v-html="dView.calendarEventDetail.selectedEvent.name"></v-toolbar-title>

							<v-spacer></v-spacer>

							<!-- <v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon v-bind="attrs" v-on="on">
										<v-icon>far fa-calendar-plus</v-icon>
									</v-btn>
								</template>
								<span>Thêm Ghi Chú</span>
							</v-tooltip> -->
						</v-toolbar>

						<v-card-text>
							<p class="text-body-1" v-html="dView.calendarEventDetail.selectedEvent.details"></p>
						</v-card-text>

						<v-card-actions>
							<!-- <v-btn text>
								Xem Ghi Chú
							</v-btn> -->

							<v-spacer></v-spacer>

							<v-btn text @click="dView.calendarEventDetail.selectedOpen = false">
								Huỷ Bỏ
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-menu>
			</v-sheet>
		</v-col>

		<v-col class="hidden-md-and-up mx-2 mobileView">
			<Calendar
				is-expanded
				transition="slide-h"
				:attributes="mView.attrs"
				color="blue"
				:first-day-of-week="2"
				locale="vi"
				@dayclick="dayClicked"
				:is-dark="config.darkTheme"
			></Calendar>

			<v-card class="mt-2 eventsList " elevation="1">
				<p v-if="!checkHasEvent" class="text-center mt-5">Bạn không có môn học vào hôm này !</p>

				<v-card-text v-else class="pa-0">
					<v-list class="mb-3" nav disabled inactive subheader>
						<v-list-item-group>
							<v-list-item three-line v-for="(event, index) in mView.eData" :key="index">
								<v-list-item-content>
									<v-list-item-title class="text-h6" :class="`${event.color}--text`">{{ event.subjectName }}</v-list-item-title>

									<v-list-item-subtitle class="text-subtitle-1">
										Tiết:
										<strong>{{ event.lesson }}</strong>
										|
										<strong>
											{{ convertLessonsToTime(event.lesson).start }} -> {{ convertLessonsToTime(event.lesson).end }}
										</strong>
									</v-list-item-subtitle>

									<v-list-item-subtitle class="text-subtitle-1">
										Phòng:
										<strong>{{ event.room }}</strong>
									</v-list-item-subtitle>

									<v-list-item-subtitle class="text-subtitle-1">
										Giáo Viên:
										<strong>{{ event.teacher }}</strong>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	/* eslint-disable */
	import { mapState } from 'vuex'
	import moment from 'moment'
	import Spinner from '../../components/Spinner'
	import Calendar from 'v-calendar/lib/components/calendar.umd'

	export default {
		name: 'Schedule',
		components: {
			Spinner,
			Calendar
		},
		data: () => ({
			overlay: false,
			mView: {
				colors: ['red', 'green', 'teal', 'orange', 'indigo', 'purple', 'pink'],
				attrs: [
					{
						key: 'today',
						highlight: 'blue',
						dates: moment().toDate(),
					},
				],
				eData: [],
			},
			dView: {
				calendarFocus: '',
				calendar: {
					type: 'month',
					mode: 'stack',
					modes: ['stack', 'column'],
					weekdays: [1, 2, 3, 4, 5, 6, 0],
					typeToLabel: {
						month: 'Tháng',
						week: 'Tuần',
						day: 'Ngày',
						'4day': '4 Ngày',
					},
				},
				calendarEventDetail: {
					selectedOpen: false,
					selectedEvent: {},
					selectedElement: null,
				},
				colors: ['orange', 'indigo', 'deep-purple', 'cyan', 'green', 'pink lighten-1', 'red darken-1'],
				eData: [],
			},
		}),
		computed: {
			...mapState(['user', 'config']),

			checkHasEvent() {
				if (this.mView.eData.length <= 0) {
					return false
				} else {
					return true
				}
			},
		},
		methods: {
			prev() {
				this.$refs.calendar.prev()
			},
			next() {
				this.$refs.calendar.next()
			},
			getEventColor(event) {
				return event.color
			},
			setToday() {
				this.dView.calendarFocus = ''
			},
			convertDayTime(day, lesson) {
				let lessonTime = this.convertLessonsToTime(lesson)
				let time = {
					start: '',
					end: '',
				}

				if (lessonTime.start == '' || lessonTime.end == '') {
					time = {
						start: moment(day, 'DD/MM/YYYY').format('YYYY-MM-DD'),
						end: moment(day, 'DD/MM/YYYY').format('YYYY-MM-DD'),
					}
				} else {
					time = {
						start: moment((day + ' ' + lessonTime.start).trim(), 'DD/MM/YYYY H:mm').format('YYYY-MM-DD HH:mm'),
						end: moment((day + ' ' + lessonTime.end).trim(), 'DD/MM/YYYY H:mm').format('YYYY-MM-DD HH:mm'),
					}
				}

				return time
			},
			getEvent() {
				this.overlay = true

				this.user.userSchedule.forEach((e, index) => {
					let color = Math.floor(Math.random() * this.dView.colors.length)
					let detail = `Môn: <strong>${e.subjectName} (${e.subjectCode})</strong> <br> Lớp: <strong>${e.className}</strong> <br> Tiết: <strong>${e.lesson}</strong> <br> Phòng Học: <strong>${e.room}</strong> <br> Giáo Viên: <strong>${e.teacher}</strong>`
					let time = this.convertDayTime(e.day, e.lesson)

					this.dView.eData.push({
						name: e.subjectName,
						start: time.start,
						end: time.end,
						color: this.dView.colors[color],
						details: detail,
					})

					this.mView.attrs.push({
						key: index + 1,
						dot: {
							color: this.mView.colors[Math.floor(Math.random() * this.mView.colors.length)],
						},
						dates: moment(e.day, 'DD/MM/YYYY').toDate(),
					})
				})

				setTimeout(() => {
					this.overlay = false
				}, 200)
			},
			convertLessonsToTime(lessons) {
				let time = {
					start: '',
					end: '',
				}

				switch (lessons) {
					case '1,2,3':
						time = {
							start: '7:00',
							end: '9:25',
						}
						break
					case '4,5,6':
						time = {
							start: '9:35',
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
					case '7,8,9,10':
						time = {
							start: '12:30',
							end: '15:50',
						}
						break
				}
				return time
			},
			showEvent({ nativeEvent, event }) {
				const open = () => {
					this.dView.calendarEventDetail.selectedEvent = event
					this.dView.calendarEventDetail.selectedElement = nativeEvent.target
					setTimeout(() => (this.dView.calendarEventDetail.selectedOpen = true), 10)
				}

				if (this.dView.calendarEventDetail.selectedOpen) {
					this.dView.calendarEventDetail.selectedOpen = false
					setTimeout(open, 10)
				} else {
					open()
				}

				nativeEvent.stopPropagation()
			},
			translateMonth(str) {
				let a = str.split(' ')
				const dic = {
					January: 'Tháng Một',
					February: 'Tháng Hai',
					March: 'Tháng Ba',
					April: 'Thánng Bốn',
					May: 'Tháng Năm',
					June: 'Tháng Sáu',
					July: 'Tháng Bảy',
					August: 'Tháng Tám',
					September: 'Tháng Chín',
					October: 'Tháng Mười',
					November: 'Tháng Mười Một',
					December: 'Tháng Mười Hai',
				}

				let text = dic[a[0]] + ' ' + a[1]
				return text
			},
			dayClicked(e) {
				let day = moment(e.date).format('DD/MM/YYYY')
				this.mView.eData = []

				this.user.userSchedule.forEach((a) => {
					if (a.day == day) {
						let data = {
							...a,
							color: this.mView.colors[Math.floor(Math.random() * this.mView.colors.length)],
						}
						this.mView.eData.push(data)
					}
				})
			},
			getToday() {
				let day = moment().format('DD/MM/YYYY')

				this.mView.eData = []

				this.user.userSchedule.forEach((a) => {
					if (a.day == day) {
						let data = {
							...a,
							color: this.mView.colors[Math.floor(Math.random() * this.mView.colors.length)],
						}
						this.mView.eData.push(data)
					}
				})
			},
		},
		mounted() {
			this.getEvent()
			document.title = 'Thời Khoá Biểu | KMA Schedule'
		},
		created() {
			this.getToday()
		},
	}
</script>

<style>
	html,
	body {
		overflow-x: hidden;
	}

	.eventsList {
		overflow: auto;
	}
</style>

<style lang="scss" scoped>
	.mobileView {
		height: 92vh;
	}

	.eventsList {
		height: 50%;
	}
</style>
