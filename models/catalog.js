const mongoose=require('mongoose')

const catalogSchema = mongoose.Schema({
    itemname:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    addresslist:[{
        address:{
            type:String
        }
    }]
})

const Catalog= mongoose.model('Catalog',catalogSchema)

module.exports=Catalog