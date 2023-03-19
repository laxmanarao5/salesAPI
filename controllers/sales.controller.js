const axios =require("axios")

//import sales model
const {Sales}=require("../database/models/sales.model")

//import express-async-handler
const expressAsyncHandler=require("express-async-handler")

const {Op,QueryTypes} =require("sequelize")
const { sequelize } = require("../database/db.config")


//controller for initialization of database
exports.initialize=expressAsyncHandler(async(req,res)=>{

    //get data from API
    let {data}=await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")

    //insert data into database
    data.map(async(salesObject)=>await Sales.create(salesObject))
    
    //send response
    res.send({message:"Database initialized suucessfully"})
})


//get details by Month
exports.statisticsByMonth=expressAsyncHandler(async(req,res)=>{

    //month from parameters
    let month=req.params.month
    //pattern
    let pattern="_____"+month+"%"
    //query
    let query="select * from sales where monthname(dateOfSale)='"+month+"'"
    //running query
    let result= await sequelize.query(query, { type: QueryTypes.SELECT ,
    model:Sales})
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:result})
})

//category range
exports.statisticsByCategory=expressAsyncHandler(async(req,res)=>{
    
    //month from parameters
    let month=req.params.month
    //pattern
    let pattern="_____"+month+"%"
    //query
    let query="select category,count(*) as items from sales where monthname(dateOfSale)='"+month+"' group by category"
    //running query
    let result= await sequelize.query(query, { type: QueryTypes.SELECT ,
    model:Sales})
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:result})
})

//items by price
exports.statisticsOfItems=expressAsyncHandler(async(req,res)=>{
    
    //month from parameters
    let month=req.params.month
    //pattern
    let pattern="_____"+month+"%"
    //query
    let query="select * from sales where monthname(dateOfSale)='"+month+"' group by category"
    //running query
    let result= await sequelize.query(query, { type: QueryTypes.SELECT ,
    model:Sales})
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:result})
})


//final report
exports.finalReport=expressAsyncHandler(async(req,res)=>{
    
    //month from parameters
    let month=req.params.month
    //pattern
    let pattern="_____"+month+"%"
    //query
    
    //running query
    let result= await sequelize.query(query, { type: QueryTypes.SELECT ,
    model:Sales})
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:result})
})