const mongoose = require('mongoose')

const orderSchema =mongoose.Schema({
    itemlist:[{
        itemname:{
            type:String 
        },
        count:{
            type:Number
        }
    }],
    deliveryperson:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Delivery'
    },
    orderstatus:{
        type:String,
        default:'order placed'
    },
    customerid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    pickuploc:[{
        itemname:{
            type:String
        },
        address:{
            type:String
        }
        
    }],

})

const Order=mongoose.model('Order',orderSchema)

module.exports=Order