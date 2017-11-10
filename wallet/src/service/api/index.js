import baseUrl from '@/config/base-url'
import wallet from './children/wallet.js'
import deposit from './children/deposit.js'
import balance from './children/balance.js'

let api = {
  ...wallet,
  ...deposit,
  ...balance
}

Object.keys(api).forEach(key => {
  api[key] = baseUrl + api[key]
})

export default api