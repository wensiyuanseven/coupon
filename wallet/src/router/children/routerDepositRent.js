import depositRent from '@/views/deposit-rent/deposit-rent'
import payRentResult from '@/views/deposit-rent/children/pay-result'

export default [{
    path: '/depositRent',
    name: 'depositRent',
    meta: {
        title: '长租保证金'
    },
    component: depositRent
}, {
    path: '/depositRent/payResult',
    name: 'payRentResult',
    meta: {
        title: '保证金交纳'
    },
    component: payRentResult
}]