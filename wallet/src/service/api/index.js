import baseUrl from '@/config/base-url'
import wallet from './children/wallet.js'
import deposit from './children/deposit.js'
import balance from './children/balance.js'
// 对象展开运算符
let api = {
  ...wallet, //0
  ...deposit, //1
  ...balance //2
}
// 循环对象拼接url路径
Object.keys(api).forEach(key => {
  api[key] = baseUrl + api[key]
})

export default api
