import depositShare from '@/views/deposit-share/deposit-share'
import sesameCredit from '@/views/deposit-share/children/sesame-credit'
import payShareResult from '@/views/deposit-share/children/pay-result'
import sesameCreditHelp from '@/views/deposit-share/children/sesame-credit-help'
import shareDepositInstruction from '@/views/deposit-share/children/instruction'
import sesameAuth from '@/views/deposit-share/children/sesame-auth'

export default [{
    path: '/depositShare',
    name: 'depositShare',
    meta: {
        title: '分时保证金'
    },
    component: depositShare
}, {
    path: '/depositShare/instruction',
    name: 'shareDepositInstruction',
    meta: {
        title: '保证金说明'
    },
    component: shareDepositInstruction
}, {
    path: '/depositShare/payResult',
    name: 'payShareResult',
    meta: {
        title: '保证金交纳'
    },
    component: payShareResult
}, {
    path: '/sesameCredit',
    name: 'sesameCredit',
    meta: {
        title: '芝麻信用'
    },
    component: sesameCredit
}, {
    path: '/sesameCreditHelp',
    name: 'sesameCreditHelp',
    meta: {
        title: '芝麻信用'
    },
    component: sesameCreditHelp
}, {
    path: '/sesameAuth',
    name: 'sesameAuth',
    meta: {
        title: '芝麻信用授权'
    },
    component: sesameAuth
}]