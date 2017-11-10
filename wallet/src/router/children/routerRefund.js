import refund from '@/views/refund/refund'
import refundReason from '@/views/refund/refund-reason'
// import test from '@/views/test'

export default [{
	path: '/refund',
	name: 'refund',
	meta: {
		title: '保证金退款'
	},
	component: refund
}, {
  path: '/refundReason',
  name: 'refundReason',
  meta: {
    title: '退款原因'
  },
  component: refundReason
}/*, {
  path: '/test',
  name: 'test',
  meta: {
    title: 'test'
  },
  component: test
}*/]
