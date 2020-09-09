module.exports = {
    namespaced: true,
    state: {
        isLogined: false,
        userData: null,
        userSchedule: null
    },
    mutations: {
        SET_USER: (state, payload) => {
            state.userData = payload.studentInfo
            state.userSchedule = payload.schedule
            state.isLogined = true
        },
        LOGOUT: (state) => {
            console.log("LOGOUT")
            state.userData = null
            state.userSchedule = null
            state.isLogined = false
        }
    },
    actions: {
    },
}