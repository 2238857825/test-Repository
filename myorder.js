const router = require('./express')
const pay = require('./database/pay')
const paystatus = require('./database/paystatus')
const img_detial = require('./database/img_detial')

router.get('/myorder', (req, res) => {
    if (req.auth) {
        //    将pay和paystatus和img_detial表中的数据进行关联
        pay.hasOne(paystatus, {
            foreignKey: 'order_id'
        })
        paystatus.belongsTo(pay,{
            foreignKey: 'order_id',
            targetKey: 'order_id'
        })
        paystatus.belongsTo(img_detial, {
            foreignKey: 'rod_id'
        })
        paystatus.findAll({
            where: {
                email: req.auth.email,
                flag: 0
            },
            include: [{
                model: pay
            }, {
                model: img_detial
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