import balance from '@/views/balance/balance'
import paymoney from '@/views/balance/children/card-pay'
import payBalanceResult from '@/views/balance/children/pay-result'

export default [{
    path: '/balance',
    name: 'balance',
    meta: {
      title: '余额'
    },
    component: balance
  },
  {
    path: '/cardpay',
    name: 'cardpay',
    meta: {
      title: '余额充值'
    },
    component: paymoney
  },
  {
    path: '/balance/payResult',
    name: 'payBalanceResult',
    meta: {
      title: '余额充值'
    },
    component: payBalanceResult
  }
]
