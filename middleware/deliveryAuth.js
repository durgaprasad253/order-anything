const jwt = require('jsonwebtoken')
const Delivery= require('../models/delivery')


//authenticates weather logged in user is delivery person or not
const deliveryAuth= async (req,res,next)=>{
    try {
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded= await jwt.verify(token,'thisisdpwebapi')
    const user = await Delivery.findOne({_id:decoded._id,'tokens.token':token})
    if(!user){
            throw new Error()
    }
    req.user=user
    req.token=token
    next()
    }
    catch (e){
        res.status(401).send({error:"Please Authenticate"})

    }

}

module.exports=deliveryAuth