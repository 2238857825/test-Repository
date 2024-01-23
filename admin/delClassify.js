const router = require('../express')
const detial=require('../database/img_detial')

router.post('/del_classify',async (req, res) => {
    console.log(req.body);
   let s=await detial.destroy({
        where: {
            id: req.body.id
        }
    })
    if(s>0){
        res.send({
            status: 0,
            message: '删除成功'
        })
    }else{
        res.send({
            status: 1,
            message: '删除失败'
        })
    }
    
})

module.exports = router