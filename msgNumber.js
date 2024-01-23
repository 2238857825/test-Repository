const router= require('./express')
const msg=require('./database/message')

router.get('/msgnumber',(req,res)=>{
    console.log(req.query);

    // 查询未读信息数量
    msg.count({
        where: {
            receiver: req.query.friendEmail,
            isRead: 0
        }
    }).then((count) => {
        console.log(count.toString());
        res.send(count)
    }).catch((err) => {
        console.log(err);''
    });

})

module.exports=router