const router = require('./express')
const products = require('./database/products')
const carts = require('./database/carts')

router.get('/cart/add', (req, res) => {
    if (req.auth) {
        products.hasMany(carts, {
            foreignKey: 'product_id',
        })
        carts.belongsTo(products, {
            foreignKey: 'product_id',
        })

        carts.findAll({
            where: {
                Email: req.auth.email
            },
            include: [{
                model: products
            }]
        }).then((data) => {
            console.log(data);
            data.forEach((item) => {
                item.product.display_image = `http://localhost:80/img_display/${item.product.display_image}`
            })
            res.send(
                {
                    status: 0,
                    message: '查询成功',
                    data: data
                }
            )
        }).catch((err) => {
            console.log(err);
            res.send("失败")
        })
    }
})

module.exports = router