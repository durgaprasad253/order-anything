const express = require('express')
const Admin=require('../models/admin')
const Order=require('../models/order')
const Delivery=require('../models/delivery')
const adminAuth=require('../middleware/adminAuth')

const router = new express.Router()


//for creating users
router.post('/admin',async (req,res)=>{
    const user = new Admin(req.body)
    try{
    const token = await user.generateAuthToken()
    res.status(201).send({user,token})
    }
    catch (e){
        res.status(500).send(e)
    } 
})


//for logging in and generating authentication token
router.post('/admin/login',async(req,res)=>{
    try{
        const user=await Admin.findByCredentials(req.body.phoneno,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch (e){
        res.status(400).send(e)
    }
})

// route to view orders by admin with status filter(status query field is required) or wihtout status filter
router.get('/admin/orders/view',adminAuth,async (req,res)=>{
    if(req.query.status){
    
    const orders=await Order.find({orderstatus:req.query.status})
    res.send(orders)  
    }
    else{
        const orders = await Order.find()
        res.send(orders)
    }
    
    
    
})

//route to update driver by admin(params order id and deliveryperson id should be passed)
router.patch('/admin/orders/assignDriver/',adminAuth,async (req,res)=>{
    const order=await Order.findById(req.query.orderid)
    order['deliveryperson']=req.query.did
    await order.save()
    res.send(order)
})

router.get('/admin/deliveryview',adminAuth,async (req,res)=>{
    try{
        const delivery=await Delivery.find()
        res.send(delivery)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

module.exports=router