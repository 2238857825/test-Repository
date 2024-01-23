const router=require('./express')
const user=require('./database/user')
const jwt=require('jsonwebtoken')
const admin = require('./database/admin')

router.post('/login',(req,res)=>{
    let data=req.body
    if(data.type=='admin'){
        user.findOne({
            where:{
                Email:data.email,
                admin:1
            }
        }).then((result)=>{
            if(result){
                if(result.Email===data.email&&result.pwd===data.password){
                    let token='Bearer '+jwt.sign({email:result.Email,isLogin:true},'secretkey',{expiresIn:3600})
                    res.send({
                        status:0,
                        message:'登录成功',
                        isLogin:true,
                        username:result.Email,
                        token:token
                    })
                }else{
                    res.send({
                        status:1,
                        message:'密码错误'
                    })
                }
            }else{
                res.send({
                    status:1,
                    message:'用户不存在'
                })
            }

        }).catch((err)=>{
            console.log(err);
            res.send('fail')
        })
    }else{
        user.findOne({
            where:{
                Email:data.email,
                pwd:data.password,
                admin:0
            }
        }).then((data)=>{
            if(data){
                // 生成token
                const token='Bearer '+jwt.sign({
                    email:data.Email,
                    isLogin:true
                },'secretkey',{expiresIn:3600})
    
                res.send({
                    status:0,
                    message:'登陆成功',
                    token:token,
                    isLogin:true,
                    username:data.Email,
                })
            }else{
                res.send({
                    status:1,
                    message:'登陆失败'
                })
            }
        }).catch((err)=>{
            console.log(err);
            res.send('fail')
        })
    }


})
module.exports=router