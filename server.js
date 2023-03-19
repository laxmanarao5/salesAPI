//import express
const exp=require("express")

//call the express fucntion
const app=exp()

//import dotenv
require("dotenv").config()

//expose to port
app.listen(process.env.PORT || 80,()=>{
    console.log(`listening to port ${process.env.PORT}`);
})

//import database connection
const {sequelize}=require("./database/db.config")

//Test Database connection
sequelize.authenticate()
.then(()=>console.log("Connection sucess"))
.catch(err=>console.log("Error occured : ",err))


const salesApp=require("./routes/sales.route")


//routing to saleapp
app.use("/sales",salesApp)

//Invalid path middleware
app.use("*",(req,res)=>{
    res.send({message:"Invalid path"})
})

//Error handler middleware
app.use((err,req,res,next)=>{
    res.send({message:"error occured",error:err.message})
})