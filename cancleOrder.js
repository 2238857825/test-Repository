const router=require('./express')
const payStatus=require('./database/payStatus')

router.post('/cancle',(req,res)=>{
    console.log(req.body);
    console.log(req.auth);
    if(req.auth){
        // 删除paystatus表中的数据
        payStatus.destroy({
            where:{
                order_id:req.body.order_id
            }
        }).then((data)=>{
            console.log(data);
            res.send({
                status:0,
                msg:'ok'
            })
        }
        ).catch((err)=>{
            console.log(err);
            res.send({
                status:1,
                msg:'err'
            })
        })
    }
})

module.exports=router