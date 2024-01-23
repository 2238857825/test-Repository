const sequelize=require('./config')
const {DataTypes}=require('sequelize')

const list=sequelize.define('friendList',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    friendEmail:{
        type:DataTypes.STRING,
        allowNull:false
    },
    productID:{
        type:DataTypes.INTEGER,
        allowNull:true,
    }
},{
    timestamps:false,
    tableName:'friendList'
})

module.exports=list