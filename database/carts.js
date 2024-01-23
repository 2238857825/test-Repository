const sequelize=require('./config')
const {DataTypes}=require('sequelize')

const cart=sequelize.define('cart',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    add_date:{
        type:DataTypes.DATE,
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'cart'
})

module.exports=cart