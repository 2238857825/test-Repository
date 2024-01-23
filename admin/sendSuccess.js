const router = require('../express')
const pay = require('../database/pay')

router.post('/sendto', (req, res) => {
    pay.update({
        issend: 1
    }, {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        if (data > 0) {
            res.send({
                status: 0,
                message: '发送成功'
            })
        } else {
            res.send({
                status: 1,
                message: '发送失败'
            })
        }
    })
})

module.exports = router