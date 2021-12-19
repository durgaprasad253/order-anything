const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')


//Schema for User model
adminSchema= mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
               throw new Error('Password cannot contain "password"')
           }  
   }
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})


//to hash plain password
adminSchema.pre('save',async function (next){
    const user=this
    if(user.isModified('password'))
    {
        user.password= await bcrypt.hash(user.password,8)
        next()
    }
})


//to verify password and logging in
adminSchema.statics.findByCredentials= async (phoneno,password)=>{
    const user =await  Admin.findOne({phoneno})
    if(!user){
        throw new Error("unable to login")
    }
    const ismatch = await bcrypt.compare(password,user.password)
    if(!ismatch)
    {
        throw new Error("unable to login")
    }
    return user
}


//generates authentication token
adminSchema.methods.generateAuthToken=async function(){
    const user=this
    const token= jwt.sign({_id:user._id.toString()},'thisisdpwebapi')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token



}

adminSchema.methods.toJSON= function (){
    const user = this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
    
}



const Admin = mongoose.model('Admin',adminSchema)
module.exports=Admin