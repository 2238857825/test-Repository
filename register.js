const router = require('./express')
const user = require('./database/user');
const Sequelize = require('./database/config')
const fs = require('fs')

router.post('/register', (req, res) => {
    console.log(req.session.code);
    let data=req.body.params
    console.log(data);

    if (req.body.params.code == req.session.code && req.body.params.code != undefined && req.body.params.code != '') {
        console.log('验证码正确');
        //将req.body.parame.avatar转化为图片
        let base64Data = req.body.params.imageUrl.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = Buffer.from(base64Data, 'base64');
        let time = new Date().getTime();
        let imgName = `${time}${req.body.params.avatarName}`;


        try{
            const results = Sequelize.transaction(async (t) => {
                try{
                    const insert=await user.create({
                        Email: data.email,
                        Gender: data.sex,
                        Birthday: data.value1,
                        pwd: data.password,
                        NickName: data.username,
                        avatar: imgName,
                        Motto: data.textarea
                    }, {
                        transaction: t
                    })

                    if(insert){
                        console.log(insert+'插入成功');
                        // 将图片保存到本地
                        fs.writeFile(`./public/avatar/${imgName}`, dataBuffer, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('success');
                            }
                        })
                        res.send('success')
                    }

                }catch{
                    console.log('插入失败');
                    res.send('fail')
                }   
            })
           
        }catch{
            console.log('插入失败');
            res.send('fail')
        }
    }else{
        res.send('fail')
    }

})
module.exports = router