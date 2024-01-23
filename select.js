const router = require('./express')
const product = require('./database/products')
const { Op } = require('sequelize')

router.post('/select', function (req, res) {
    console.log(req.body.data);
    // 在product中查找所有name带有req.body.data的数据
    product.findAll({
        // attributes: ['id','display_image','name','price','description']
        where: {
            [Op.or]: {
                name: {
                    [Op.substring]: `${req.body.data}`,
                },
                description: {
                    [Op.substring]: `${req.body.data}`,
                },
            }
        }
    }).then((data) => {
        console.log(data);
        //给每个图片加上路径
        data.forEach((item) => {
            item.display_image = `http://localhost:80/img_display/${item.display_image}`
        })


        res.send(data)
    }).catch((err) => {
        console.log(err);
        res.send("失败")
    })
})


module.exports = router