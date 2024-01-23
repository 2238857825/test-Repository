const sequelize=require('./config')
const {DataTypes}=require('sequelize')
const User=sequelize.define('products',{
    // id
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    // 产品名称
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    // 产品类别
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    // 产品价格
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    // 产品描述
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    // 产品厂商
    manufacturer:{
        type:DataTypes.STRING,
        allowNull:false
    },
    // 产品材料
    material:{
        type:DataTypes.STRING,
        allowNull:false
    },
    // 长度
    length:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    // 重量
    weight:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    // 颜色
    color:{
        type:DataTypes.STRING,
        allowNull:true
    },
    // 库存数量
    stock_quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    // 生产日期
    creation_date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    // 更改日期
    last_updated:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    // 产品图片
    display_image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'products',
    noPrimaryKey: true,
    timestamps:false
})
module.exports=User
