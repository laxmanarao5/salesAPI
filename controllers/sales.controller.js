const axios =require("axios")

//import sales model
const {Sales}=require("../database/models/sales.model")

//import express-async-handler
const expressAsyncHandler=require("express-async-handler")

const {Op,QueryTypes} =require("sequelize")
const { sequelize } = require("../database/db.config")
const { stat } = require("fs")


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
    let result= await sequelize.query("select * from sales where monthname(dateOfSale)='"+month+"'", { type: QueryTypes.SELECT ,
    model:Sales})
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:result})
})

//category - Pie chart
exports.statisticsByCategory=expressAsyncHandler(async(req,res)=>{
    
    //month from parameters
    let month=req.params.month
    //pattern
    let pattern="_____"+month+"%"

    //running query
    let result= await sequelize.query("select category,count(*) as items from sales where monthname(dateOfSale)='"+month+"' group by category", { type: QueryTypes.SELECT ,
    model:Sales})
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:result})
})

//items by price for Bar graph
exports.statisticsOfItems=expressAsyncHandler(async(req,res)=>{
    
    //month from parameters
    let month=req.params.month
    //pattern
    let pattern="_____"+month+"%"
    let object={}

    //Running queries for all intervals
    for(let i=0;i<9;i++){
       let  start=i*100+1
       if(i==0)
       start=start-1
       let end=100+i*100

        //running query
        let result= await sequelize.query("select * from sales where monthname(dateOfSale)='"+month+"'&& price between "+start+" and "+end, { type: QueryTypes.SELECT ,
        model:Sales})
            object[start+"-"+end]=result.length
            
        }
        //running query
    let result= await sequelize.query("select * from sales where monthname(dateOfSale)='"+month+"'&& price>900", { type: QueryTypes.SELECT ,
    model:Sales})

    object["900 -above"]=result.length
    //send response
    res.send({message:"Data fetched sucessfully",payload:object})
})


//final report
exports.finalReport=expressAsyncHandler(async(req,res)=>{
    
    //month from parameters
    let month=req.params.month
    //pattern
    let pattern="_____"+month+"%"

    //running query for Montly report API
    let montlyreport= await sequelize.query("select * from sales where monthname(dateOfSale)='"+month+"'", { type: QueryTypes.SELECT ,
    model:Sales})

    //running query for Pie chart API
    let pieChart= await sequelize.query("select category,count(*) as items from sales where monthname(dateOfSale)='"+month+"' group by category", { type: QueryTypes.SELECT ,
        model:Sales})
    
    //Running qqueries for Bar chart
    //Running queries for all intervals 
    let object={}
    for(let i=0;i<9;i++){
           let  start=i*100+1
           if(i==0)
           start=start-1
           let end=100+i*100
    
            let query="select * from sales where monthname(dateOfSale)='"+month+"'&& price between "+start+" and "+end
                //running query
            let result= await sequelize.query(query, { type: QueryTypes.SELECT ,
            model:Sales})
                object[start+"-"+end]=result.length
                
            }
         //running query
        result= await sequelize.query("select * from sales where monthname(dateOfSale)='"+month+"'&& price>900", { type: QueryTypes.SELECT ,
        model:Sales})
        
        object["900 -above"]=result.length
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:{report:montlyreport,pieChart:pieChart,barChart:object}})
})