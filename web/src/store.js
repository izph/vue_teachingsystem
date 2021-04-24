import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      // id: '',
      // user_name: '',
      // staff_no: ''
    },
    class_no_name: {

    }
  },
  mutations: {
    setHouseMasterId(state, HouseMasterId) {
      state.HouseMasterId = HouseMasterId;
    },
    setStudentId(state, StudentId) {
      state.StudentId = StudentId;
    }
  },
  actions: {}
})
