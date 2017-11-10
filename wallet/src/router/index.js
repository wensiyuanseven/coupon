import Vue from 'vue'
import Router from 'vue-router'

import wallet from '@/views/wallet'
import pay from '@/views/pay/pay'

import routerBalance from './children/routerBalance.js'
import routerDepositShare from './children/routerDepositShare.js'
import routerDepositRent from './children/routerDepositRent.js'
import routerRefund from './children/routerRefund.js'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'wallet',
            meta: {
                title: '我的钱包'
            },
            component: wallet
        }, {
            path: '/pay',
            name: 'pay',
            meta: {
                title: '支付'
            },
            component: pay
        },
        ...routerBalance,
        ...routerDepositShare,
        ...routerDepositRent,
        ...routerRefund
    ]
})

let pathStack = []

// 路由拦截
router.beforeEach((to, from, next) => {
    if (pathStack.length && pathStack[pathStack.length - 1] == to.fullPath) {
        to.query.direction = 'back'
        console.log('====back====')
        pathStack.pop()
        if (from.name == 'wallet') {
            console.log('====home====')
            if (Vue.prototype.$bridge && Vue.prototype.$bridge.callHandler) {
                Vue.prototype.$bridge.callHandler('backToHome')
                next(false)
            }
        }
    } else {
        to.query.direction = 'forward'
        pathStack.push(from.fullPath)
    }
    // if (from.name == 'wallet') {
    //     if (Vue.prototype.$bridge && Vue.prototype.$bridge.callHandler) {
    //         Vue.prototype.$bridge.callHandler('backToHome')
    //     }
    //     return
    // }
    // let $toast = document.querySelector('.mint-toast')
    // $toast && $toast.remove()
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (Vue.prototype.$bridge && Vue.prototype.$bridge.callHandler) {
        Vue.prototype.$bridge.callHandler('pageRedirect', {
            title: to.meta.title || document.title,
            url: to.fullPath,
            name: to.name
        }, function responseCallback(responseData) {})
    }
    next()
})

export default router