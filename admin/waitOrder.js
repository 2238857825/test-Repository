const router = require('../express')
const pay = require('../database/pay')
const paystatus = require('../database/paystatus')
const img_detial = require('../database/img_detial')
const products = require('../database/products')

router.get('/wait_order', (req, res) => {
    if (req.auth) {
        //    将pay和paystatus和img_detial表中的数据进行关联
        pay.hasOne(paystatus, {
            foreignKey: 'order_id'
        })
        paystatus.belongsTo(pay, {
            foreignKey: 'order_id',
            targetKey: 'order_id'
        })
        paystatus.belongsTo(img_detial, {
            foreignKey: 'rod_id'
        })

        paystatus.belongsTo(products, {
            foreignKey: 'product_id'
        })
        paystatus.findAll({
            where: {
                flag: 0,
                ispay: 0
            },
            include: [{
                model: pay,
            }, {
                model: img_detial
            },{
                model: products
            }]

        }).then((data) => {
            console.log(data);
            data.forEach((item) => {
                if(item.rod_display){
                    item.rod_display.img_display = `http://localhost:80/img_detial/${item.rod_display.img_display}`
                }
            })
            res.send({
                status: 0,
                message: '查询成功',
                data: data
            })
        }).catch((err) => {
            console.log(err);
            res.send({
                status: 1,
                message: '查询失败'
            })
        })
    }
})

module.exports = router