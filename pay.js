const router = require('./express')
const pay = require('./database/pay')
const detial = require('./database/img_detial')
const products = require('./database/products')
const payStatus = require('./database/payStatus')
const sequelize = require('./database/config')



router.post('/pay', (req, res) => {
    console.log(req.body);
    console.log(req.auth);
    if (req.auth) {
        // 根据req.body.order_id修改paystatus表中的ispay
        try {
            // 使用事务进行回滚
            try {
                sequelize.transaction(async t => {
                    await payStatus.update({
                        ispay: 1
                    }, {
                        where: {
                            order_id: req.body.order_id
                        }
                    }, t)

                    detial.findOne({
                        attributes: ['rod_id'],
                        where: {
                            id: req.body.id
                        },
                    },t).then((data) => {
                        console.log(data.rod_id);
                        pay.create({
                            email: req.auth.email,
                            product_id: req.body.id,
                            number: req.body.number,
                            date: new Date(),
                            price: req.body.price,
                            rod_id: data.rod_id,
                            name: req.body.name,
                            address: req.body.address,
                            iphone: req.body.iphone,
                            order_id: req.body.order_id
                        },t).then((data) => {
                            console.log(data);
                            res.send({
                                status: 0,
                                message: '添加成功'
                            })
                        }).catch((err) => {
                            console.log(err);
                            res.send({
                                status: 1,
                                message: '添加失败'
                            })
                        })
                    }).catch((err) => {
                        console.log(err);
                    })

                })

            } catch (err) {
                console.log(err);
            }


        } catch (err) {
            console.log(err);
        }






    }

})

module.exports = router