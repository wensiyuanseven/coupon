// 导出所有文件
import wallet from './children/wallet.js' //钱包
import deposit from './children/deposit.js' //押金
import balance from './children/balance.js' //余额

export default {
  ...wallet,
  ...deposit,
  ...balance
}