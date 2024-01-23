const config = require('./config')
const { DataTypes } = require('sequelize')
const detial = config.define('rod_display', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rod_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    img_display: {
        type: DataTypes.STRING,
        allowNull: true
    },
    classify: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:true
    }
}, {
    timestamps: false,
    tableName: 'rod_display'
})
module.exports = detial