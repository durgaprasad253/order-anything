const jwt = require('jsonwebtoken')
const Customer= require('../models/customer')


//authenticates weather logged in user is customer or not
const customerAuth= async (req,res,next)=>{
    try {
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded= jwt.verify(token,'thisisdpwebapi')
    const user = await Customer.findOne({_id:decoded._id,'tokens.token':token})
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

module.exports=customerAuth