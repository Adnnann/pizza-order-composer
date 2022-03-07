import Order from '../models/orders.model'
import _ from 'lodash'
import dbErrorHandlers from './helpers/dbErrorHandlers'
import jwtDecode from 'jwt-decode'

const createOrder = (req, res) => {

    const order = new Order(req.body) 
    order.save((err)=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
        return res.send({message: 'Order placed successfuly'})
    })
}
const getOrders = (req, res) => {
    // get id to enable filtering of data
    const userId = jwtDecode(req.cookies.userJwtToken)._id
    //filter data - get transactions for last three days
    Order.find({})
    .where('userId').equals(userId)
    //sort data in descinding order
    .sort({"created":-1})
    .exec((err, orders) => {
        if(err){
            return res.send({error:dbErrorHandlers.getErrorMessage(err)})
        }
        res.send(orders)
    })
}
export default {
    createOrder,
    getOrders
}
