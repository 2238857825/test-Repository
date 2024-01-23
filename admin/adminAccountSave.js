const router=require('../express')
const user=require('../database/user')

router.post('/admin_account_save',async (req,res)=>{
    console.log(req.body);
     await user.update({
        NickName:req.body.NickName,
        pwd:req.body.pwd,
        Gender:req.body.Gender,
        Birthday:req.body.Birthday
    },{
        where:{
            Email:req.body.Email
        }
    }).then((data)=>{
        if(data[0]>0){
            res.send({
                status:0,
                msg:'修改成功'
            })
    
        }else{
            res.send({
                status:1,
                msg:'修改失败'
            })
        }
    })


})

module.exports=router
