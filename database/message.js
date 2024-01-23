const config = require('./config')
const { DataTypes } = require('sequelize')

const messages=config.define('message',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    sender:{
        type:DataTypes.STRING,
        allowNull:false
    },
    receiver:{
        type:DataTypes.STRING,
        allowNull:false
    },
    msg:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isRead:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    datatime:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:new Date()
    },
    productID:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'text'
    }
},{
    timestamps:false,
    tableName:'message'
})
module.exports=messages