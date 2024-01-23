const nodemailer=require('nodemailer')

module.exports= async function sendMail(toEmail,sendText,host='smtp.qq.com'){

    let fromEmail='2238857825@qq.com'
    let pass='wwypzjuplplcdifj'

    let user='2238857825@qq.com'

    let transposter=nodemailer.createTransport({
        host:host,
        secureConnection:true,
        auth:{
            user:user,
            pass:pass
        },
        tls:{
            rejectUnauthorized:false
        },
    });

    let info=await transposter.sendMail({
        from:'"来自"<'+fromEmail+'>', //发送的邮件的邮箱信息
        to:toEmail,  //发送给谁
        subject:"验证码" , //标题
        html:"你的验证码为<b style='color:skybkue;'>" + sendText + "</b>,5分钟内有效,请务透漏给他人!"

    },(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
}
// mail('2238857825@qq.com','2238857825@qq.com','2238857825@qq.com','wwypzjuplplcdifj','大木头').catch(console.error)