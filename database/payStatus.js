const sequelize=require('./config')
const {DataTypes}=require('sequelize')

const cart=sequelize.define('pay_wait',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    order_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    rod_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
        default:DataTypes.NOW
    },
    ispay:{
        type:DataTypes.INTEGER,
        allowNull:false,
        default:0
    },//0未支付，1已支付
    flag:{
        type:DataTypes.INTEGER,
        allowNull:false,
        default:0
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    tableName:'pay_wait',
    timestamps:false
})

module.exports=cart