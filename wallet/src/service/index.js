import wallet from './children/wallet.js'
import deposit from './children/deposit.js'
import balance from './children/balance.js'

export default {
  ...wallet,
  ...deposit,
  ...balance
}