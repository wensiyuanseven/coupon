import {
  fetch
} from '../fetch.js'
import api from '../api/'

/**
 * 获取分时保证金详情
 * @param  {String} userId [用户ID]
 * @return {Promise}
 */
let getShareDepositDetail = function(userId) {
  return fetch(api.GET_SHARE_DEPOSIT_DETAIL, {
    userId
  })
}

/**
 * 获取当前芝麻信用优惠设置
 * @return {Promise}
 */
let getSesameConfig = function() {
  return fetch(api.GET_SESAME_CONFIG, null)
}

/**
 * 获取长租保证金详情
 * @param  {String} userId 用户ID
 * @return {Promise}
 */
let getRentDepositDetail = function(userId) {
  return fetch(api.GET_RENT_DEPOSIT_DETAIL, {
    userId
  })
}

export default {
  getShareDepositDetail,
  getSesameConfig,
  getRentDepositDetail
}