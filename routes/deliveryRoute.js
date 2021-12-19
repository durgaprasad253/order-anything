const express = require('express')
const Delivery=require('../models/delivery')
const deliveryAuth=require('../middleware/deliveryAuth')
const Order=require('../models/order')

const router = new express.Router()


//for creating users
router.post('/delivery',async (req,res)=>{
    const user = new Delivery(req.body)
    try{
        const token = await user.generateAuthToken()
    res.status(201).send({user,token})
    }
    catch (e){
        res.status(500).send(e)
    } 
})


//for logging in and generating authentication token
router.post('/delivery/login',async(req,res)=>{
    try{
        const user=await Delivery.findByCredentials(req.body.phoneno,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch (e){
        res.status(400).send(e)
    }
})

router.get('/delivery/orders',deliveryAuth,async (req,res)=>{
    const orders=await Order.find()
    res.send(orders)
})


//route to update status by driver
router.patch('/delivery/orders/:id/updatestatus/',deliveryAuth,async (req,res)=>{
    const order=await Order.findById(req.params.id)
    order['orderstatus']=req.query.status
    await order.save()
    res.send(order)
})
module.exports=router