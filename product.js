const router = require('./express')
const products = require('./database/products')

router.post('/products', (req, res) => {
    //查看是否携带token
     

    products.findAll({
        // attributes: ['id','display_image','name','price','description']
    }).then((data) => {
        // console.log(data);
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