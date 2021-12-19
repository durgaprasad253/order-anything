const express=require('express')
const router= new express.Router()
const Catalog=require('../models/catalog')


//to insert catalog items
router.post('/catalog',async (req,res)=>{
    const catalog = new Catalog(req.body)
    try{
    await catalog.save()
    res.status(201).send(catalog)
    }
    catch (e){
        res.status(400).send(e)
    }
})

module.exports=router