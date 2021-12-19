const express = require('express')
const Customer=require('../models/customer')
const customerAuth=require('../middleware/customerAuth')
const Order=require('../models/order')

const router = new express.Router()


//for creating users
router.post('/customer',async (req,res)=>{
    const user = new Customer(req.body)
    try{
        const token = await user.generateAuthToken()
    res.status(201).send({user,token})
    }
    catch (e){
        res.status(500).send(e)
    } 
})


//for logging in and generating authentication token
router.post('/customer/login',async(req,res)=>{
    try{
        const user=await Customer.findByCredentials(req.body.phoneno,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch (e){
        res.status(400).send(e)
    }
})
//route for creating orders by customer
router.post('/customers/orders',customerAuth,async (req,res)=>{
    // const itemlist=[]
    // req.body.itemlist.forEach( item => {
    //     itemlist.push(item.itemname)
    // });
    
// const proclist=[1,2,3]
//     itemlist.forEach(async (item) => {
//         const cat= await Catalog.findOne({itemname:item})
//         const loc=cat.addresslist[0].address
//         const locappend={
//             itemname:item,
//             address:loc
//         }  
    // }); 


    const order=new Order({
        ...req.body,
        customerid:req.user._id,
    })
    order.save()
    res.status(201).send(order)
})

//route to view orders by perticular customer
router.get('/customer/orders/view',customerAuth,async (req,res)=>{
    const orders = await Order.find({customerid:req.user._id})
    res.send(orders)
})
module.exports=router