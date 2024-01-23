const router=require('./express')
const user=require('./database/user')

router.post('/myinfo',(req,res)=>{
    console.log('111111');
    user.findOne({
        where:{
            Email:req.auth.email
        }
    }).then((data)=>{
        if(data){
            data.avatar=`http://localhost:80/avatar/${data.avatar}`

            res.send({
                status:0,
                message:'查询成功',
                data:data
            })
        }else{
            res.send({
                status:1,
                message:'查询失败'
            })
        }
    }).catch((err)=>{
        console.log(err);
        res.send('fail')
    })
})
module.exports=router