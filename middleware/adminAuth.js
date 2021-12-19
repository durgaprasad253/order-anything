const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

//authenticates weather logged in users is an admin or not
const adminAuth= async (req,res,next)=>{
    try {
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded=  jwt.verify(token,'thisisdpwebapi')
    const user = await Admin.findOne({_id:decoded._id,'tokens.token':token})
    if(!user){
            return res.status(401).send({message:"Permission not available"})
    }
    req.user=user
    req.token=token
    next()
    }
    catch (e){
        res.status(401).send({error:"Please Authenticate"})

    }

}

module.exports=adminAuth