const router=require('./express')
const carts=require('./database/carts')

router.post('/cart',(req,res)=>{
    console.log(req.body);
    console.log(req.auth);
    // console.log(new Date());
    if(req.auth){
        carts.create({
            Email:req.auth.email,
            product_id:req.body.id,
            number:req.body.number,
            add_date:new Date()
        }).then((data)=>{
            console.log(data);
            res.send({
                status:0,
                message:'添加成功'
            })
        }).catch((err)=>{
            console.log(err);
            res.send({
                status:1,
                message:'添加失败'
            })
        })
    }
    
})

module.exports=router