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
    let result= await sequelize.query("select sold,sum(price) as sale_amount,count(title) as total_items from sales where monthname(dateOfSale)='"+month+"' group by sold", { type: QueryTypes.SELECT ,
    model:Sales})

    //Restructuring result
    let report={
        sale_amount:result[0].dataValues.sale_amount+result[1].dataValues.sale_amount,
        no_of_sold_items:result[0].dataValues.total_items,
        no_of_not_sold_items:result[1].dataValues.total_items
    }
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:report})
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
    let object={"0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "900 -above": 0}

    let result= await sequelize.query("select * from sales where monthname(dateOfSale)='"+month+"'", { type: QueryTypes.SELECT ,
        model:Sales})
    
    result.map((obj)=>{
        obj.price<=100?object["0-100"]++:
        obj.price<=200?object["101-200"]++:
        obj.price<=300?object["201-300"]++:
        obj.price<=400?object["301-400"]++:
        obj.price<=500?object["401-500"]++:
        obj.price<=600?object["501-600"]++:
        obj.price<=700?object["601-700"]++:
        obj.price<=800?object["701-800"]++:
        obj.price<=900?object["801-900"]++:
        object["900 -above"]++
    })
    //send response
    res.send({message:"Data fetched sucessfully",payload:object})
})


//final report
exports.finalReport=expressAsyncHandler(async(req,res)=>{
    
    //month from parameters
    let month=req.params.month
    //pattern
    let pattern="_____"+month+"%"

    let result= await sequelize.query("select sold,sum(price) as sale_amount,count(title) as total_items from sales where monthname(dateOfSale)='"+month+"' group by sold", { type: QueryTypes.SELECT ,
        model:Sales})
    
        //Restructuring result
        let report={
            sale_amount:result[0].dataValues.sale_amount+result[1].dataValues.sale_amount,
            no_of_sold_items:result[0].dataValues.total_items,
            no_of_not_sold_items:result[1].dataValues.total_items
        }

    //running query for Pie chart API
    let pieChart= await sequelize.query("select category,count(*) as items from sales where monthname(dateOfSale)='"+month+"' group by category", { type: QueryTypes.SELECT ,
        model:Sales})
    
    //Running qqueries for Bar chart
    let object={"0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "900 -above": 0}

    result= await sequelize.query("select * from sales where monthname(dateOfSale)='"+month+"'", { type: QueryTypes.SELECT ,
        model:Sales})
    
    result.map((obj)=>{
        obj.price<=100?object["0-100"]++:
        obj.price<=200?object["101-200"]++:
        obj.price<=300?object["201-300"]++:
        obj.price<=400?object["301-400"]++:
        obj.price<=500?object["401-500"]++:
        obj.price<=600?object["501-600"]++:
        obj.price<=700?object["601-700"]++:
        obj.price<=800?object["701-800"]++:
        obj.price<=900?object["801-900"]++:
        object["900 -above"]++
    })
    
    //send response
    res.send({message:"Data fetched sucessfully",payload:{monthlyReport:report,pieChart:pieChart,barChart:object}})
})

