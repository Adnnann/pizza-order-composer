import moongose from 'mongoose'

const OrderSchema = new moongose.Schema({
    name:{
       type:Array
    },
    additionalIngredients:{
        type: Array,
    },
    price:{
        type: Number,
    },
    pricePerItem:{
        type:[]
    },
    quantity:{
        type:Array
    },
    deliveryPrice:{
        type: Number,
    },
    userId:{
        type: String,
    },
    deliveryAddress:{
        type:Object,
    },
    paymentUponDelivery:{
        type:String
    },
    notes:{
        type:String
    },
    created: {
        type: Date,
        default: Date.now
    },
})

export default moongose.model('Orders', OrderSchema)