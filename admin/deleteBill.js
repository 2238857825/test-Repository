const router = require('../express')
const pay = require('../database/pay')
const paystatus = require('../database/paystatus')

router.post('/del_bill', async (req, res) => {
    // 打印携带的参数
    console.log(req.body)
    let bill = await pay.destroy({
        where: {
            order_id: req.body.id
        }
    })
    let bill2 = await paystatus.destroy({
        where:{
            order_id:req.body.id
        }
    })

    console.log(bill, bill2);
    if (bill>0 && bill2> 0) {
        res.send({
            status: 0,
            msg: '删除成功',
        })
    } else {
        res.send({
            status: 1,
            msg: '删除失败'
        })
    }
})

module.exports = router