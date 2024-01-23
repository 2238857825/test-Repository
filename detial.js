const router = require('./express')
const products = require('./database/products')
const Sequelize = require('./database/config')
const detial = require('./database/img_detial')


router.get('/detial', (req, res) => {

    // 将products与detial表连接
    products.hasMany(detial,{
        foreignKey: 'rod_id',
        // sourceKey: 'rod_id'
    })
    detial.belongsTo(products,{
        foreignKey: 'rod_id',
    })
    
    // 获得req.query.id
    const id = req.query.id
    // console.log(id);
    // 通过id查询数据库
    products.findOne({
        where: {
            id: id
        },
        include: [{
            model: detial,
        }]
    }).then((data) => {
        // console.log(data);
        //给每个图片加上路径 
        data.display_image = `http://localhost:80/img_display/${data.display_image}`
        if(data.rod_displays.length !== 0){
            // data.rod_displays.img_display.forEach((item) => {
            //     item.img = `http://localhost:80/img_detial/${item.img}`
            //     console.log(item.img);
            // })
            for(let i = 0; i < data.rod_displays.length; i++){
                data.rod_displays[i].img_display = `http://localhost:80/img_detial/${data.rod_displays[i].img_display}`
            }
        }
        // data.receiver='1418766488@qq.com'
        // 在data中添加一个receiver='1418766488@qq.com

        res.send(data)  
    }).catch((err) => {
        console.log(err);
        res.send("失败")
    })

   
})

module.exports = router 