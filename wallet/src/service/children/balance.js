import {fetch} from '../fetch.js'
import api from '../api/' //导入所有api对象
// console.log(api)
// post 调用
let balance = function (userId) {
  // 接口名字   参数
  return fetch(api.GET_BALANCE, { userId }, 'post')
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
