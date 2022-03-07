import express from 'express'
import orderCtrl from '../controllers/orders.controller'

const router = express.Router()

router.route('/api/orders')
.post(orderCtrl.createOrder)
.get(orderCtrl.getOrders)

// router.route('/api/transaction/:transactionId')
// .get(transactionCtrl.getTransaction)
// .put(transactionCtrl.updateTransaction)
// .delete(transactionCtrl.removeTransaction)

//router.param('transactionId', transactionCtrl.transactionByID)

export default router