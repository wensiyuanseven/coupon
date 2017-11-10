import {
  fetch
} from '../fetch.js'
import api from '../api/' //导出所有api对象
// console.log(api)
// post 调用
let balance = function (userId) {
  return fetch(api.GET_BALANCE, {
    userId
  }, 'post')
}
let recharge = function (uid, prepaidCardNumber, prepaidCardPassword) {
  return fetch(api.GET_RECHARGE, {
    uid,
    'prepaid_card_number': prepaidCardNumber,
    'prepaid_card_password': prepaidCardPassword
  }, 'post')
}
export default {
  balance,
  recharge
}
