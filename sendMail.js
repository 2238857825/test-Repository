const router=require('./express')
const email=require('./Email')
router.post('/sendMail',(req,res)=>{
    let sendMail=req.body.params.email
    // 随机生成一个四位数验证码
    let code = Math.floor(Math.random()*9000+1000)
    // 将验证码保存到session中
    req.session.code=code
    // 设置验证码的过期时间为5分钟
    req.session.cookie.maxAge=1000*60*5
    // 发送邮件
    email(sendMail,code).catch(console.error)

   
    res.send('success')
})

module.exports=router



