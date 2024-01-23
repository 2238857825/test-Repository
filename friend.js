const router=require('./express')
const user =require('./database/user')

router.get('/friend',(req,res)=>{
    console.log(req.query.email);   

    user.findOne({
            where:{
                Email:req.query.email
            }
        }).then((data)=>{
            data.avatar=`http://localhost:80/avatar/${data.avatar}`
            res.send(data)
        }).catch((err)=>{
            console.log(err);
            res.send('fail')
        })
})


module.exports=router