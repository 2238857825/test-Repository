const router=require('../express')
const user = require('../database/user')

router.get('/admin_account', (req, res) => {
    user.findAll({
        where: {
            admin: 0
        }
    }).then((data) => {

        data.forEach((item) => {
            item.avatar=`http://localhost:80/avatar/${item.avatar}`
        })

        res.send({
            status: 0,
            message: '获取成功',
            data: data
        })
    }).catch((err) => {
        res.send({
            status: 1,
            message: '获取失败'
        })
    })
})

module.exports = router