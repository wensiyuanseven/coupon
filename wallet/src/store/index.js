import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: process.env.NODE_ENV === 'production' ? null : {
      id: 87102 // 我的
        // id: 66048 // 好的
        // id: 123
        // id: 66560
    },
    refundData: {
      money: 0
    },
    payResult: {}
  },
  getters: {
    user: state => state.user,
    refundData: state => state.refundData,
    payResult: state => state.payResult
  },
  mutations: {
    setUser: function(state, user) {
      state.user = user
    },
    setRefundData: function(state, data) {
      state.refundData = data
    },
    applyForRefund: function(state, data) {
      state.refundData.money = data.money
      state.refundData.type = data.type
    },
    setRefundReason: function(state, reason) {
      state.refundData.reason = reason
    },
    setPayResult: function(state, data) {
      state.payResult = data
    }
  },
  modules: {

  }
})