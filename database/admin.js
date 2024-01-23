const sequelize=require('./config')
const {DataTypes}=require('sequelize')

const admin=sequelize.define('admin',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    pwd:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'admin'
})
module.exports=admin