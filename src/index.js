const express=require('express')
require('../db/mongoose')
const adminRoute=require('../routes/adminRoute')
const customerRoute=require('../routes/customerRoute')
const deliveryRoute=require('../routes/deliveryRoute')
const catalogRoute=require('../routes/catalogRoute')
const app=express()
const port = process.argv.PORT || 3000

app.listen(port,()=>{
    console.log("Server is Ready on port  "+port)
})

app.use(express.json())
app.use(adminRoute)
app.use(customerRoute)
app.use(deliveryRoute)
app.use(catalogRoute)
