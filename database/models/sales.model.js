//import datatypes from sequelize
const {DataTypes}=require("sequelize")


//import sequelize
const {sequelize}=require("../db.config")

exports.Sales=sequelize.define("sales",{
    id:{
            type:DataTypes.INTEGER,
            primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.DOUBLE
    },
    description:{
        type:DataTypes.STRING(2048),
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    sold:{
        type:DataTypes.BOOLEAN
    },
    dateOfSale:{
        type:DataTypes.DATE
    }
},{
    freezeTableName:true,
    createdAt:false,
    updatedAt:false
})

