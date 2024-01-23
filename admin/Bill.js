const router = require('../express')
const pay = require('../database/pay')

router.get('/bill', async (req, res) => {
    let bill = await pay.findAll()
    if (bill.length > 0) {
        res.send({
            status: 0,
            msg: '获取成功',
            data: bill
        })
    } else {
        res.send({
            status: 1,
            msg: '获取失败'
        })
    }
})

module.exports = router