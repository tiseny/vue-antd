import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: '',
    token: ''
  },
  getters: {
    filterRole: state => state.role.indexOf('admin')
  },
  mutations: {
    getRole (state, value) {
      state.role = value
    },
    getToken (state, value){
      state.token = value
    }
  },
  actions: {
    setRole({commit}){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('getRole');
          resolve();
        },1000);
      })
    }
  }
})
