//import express
const exp=require("express")

//create router
const salesApp=exp.Router()



//body-parser
salesApp.use(exp.json())

//import controller
const {initialize,statisticsByMonth,statisticsOfItems,statisticsByCategory,finalReport}=require("../controllers/sales.controller")

//initialize database
salesApp.get("/initialize",initialize)

//statistics of month
salesApp.get("/statistics/month/:month",statisticsByMonth)

salesApp.get("/items/month/:month",statisticsOfItems)

salesApp.get("/category/month/:month",statisticsByCategory)

salesApp.get("/sales-report/month/:month",finalReport)

module.exports=salesApp