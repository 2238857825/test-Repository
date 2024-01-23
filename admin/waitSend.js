const router = require('../express')
const pay = require('../database/pay')
const detial= require('../database/img_detial')
const product=require('../database/products')

router.get('/wait_send', (req, res) => {

        //    将pay和paystatus和img_detial表中的数据进行关联
        pay.belongsTo(detial, {
            foreignKey: 'product_id',
            targetKey: 'id'
        })
        detial.hasOne(pay, {
            foreignKey: 'id',
            targetKey: 'product_id'
        })
        // detial.belongsTo(product, {
        //     foreignKey: 'product_id'
        // })

        pay.findAll({
            where: {
                issend: 0
            },
            include: [{
                model: detial
        }]
            
        }).then((data) => {
            console.log(data);
            data.forEach((item) => {
                item.rod_display.img_display = `http://localhost:80/img_detial/${item.rod_display.img_display}`
            })
            res.send({
                status: 0,
                message: '查询成功',
                data: data
            })
        })
})

module.exports = router