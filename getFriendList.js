const router = require('./express')
const friendList = require('./database/friendList')
const user = require('./database/user')
const product = require('./database/products')

router.get('/getFriendList', (req, res) => {
    console.log(req.body);

    // 将friendList表中的friendEmail和user表中的email进行关联
    friendList.belongsTo(user, {
        foreignKey: 'friendEmail',
        targetKey: 'Email',
    })
    friendList.belongsTo(product, {
        foreignKey: 'productID',
        targetKey: 'id',
    })

    friendList.findAll({
        where: {
            email: req.query.myemail,
        },
        include: [{
            model: user,
        },{
            model: product,
        }]
    }).then((data) => {
        
        // 遍历data
        data.forEach((item) => {
            console.log(item);
            if(item.user.avatar){
                item.user.avatar = `http://localhost:80/avatar/${item.user.avatar}`
            }
            if(item.product){
                item.product.display_image =`http://localhost:80/img_display/${item.product.display_image}`
            }
        })
        res.send(data)
    })

})

module.exports = router