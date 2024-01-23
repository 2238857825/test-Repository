const router=require('./express')
const paystatus=require('./database/paystatus')

router.post('/payStatus',(req,res)=>{
    console.log(req.body);
// 生成一个订单号

// 必要的
    const order_id=new Date().getTime()+parseInt(Math.random()*10000)
    paystatus.create({
        email:req.auth.email,
        order_id:order_id,
        price:req.body.price,
        rod_id:req.body.rod_id,
        product_id:req.body.product_id,
        date:new Date(),
        ispay:0,
        flag:0,
        number:req.body.number
    }).then((data)=>{
        console.log(data);
        res.send({
            status:0,
            msg:'ok',
            data:{
                order_id:order_id
            }
        })
    }).catch((err)=>{
        console.log(err);
        res.send({
            status:1,
            msg:'err'
        })
    })
})

module.exports=router   