const router = require('../express')
const products = require('../database/products')
const detial=require('../database/img_detial')

router.post('/del_product',async (req, res) => {
    console.log(req.body);
    let s=await detial.findOne({
        attributes: ['id']
    },{
        where: {
            rod_id: req.body.id
        }
    })
     
    let r=await products.destroy({
        where: {
            id: req.body.id
        }
    })
    let m=await detial.destroy({
        where: {
            rod_id: s.id
        }
    })

    if(m>0||r>0){
        res.send({
            status: 0,
            message: '删除成功'
        })
    }
    else{
        res.send({
            status: 1,
            message: '删除失败'
        })
    }

})

module.exports = router