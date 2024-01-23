const router = require('./express')
const friendList = require('./database/friendList')

// 保存好友列表

router.post('/saveFriendList', (req, res) => {


    console.log(req.body.friendList);
    

    // 删除friendList表中email为req.body.myemail的记录
    try {
        if(req.body.friendList.length > 0){
        //     friendList.destroy({
        //         where: {
        //             email: req.body.myemail
        //         }
        //     }).then((data) => {
    
        //         // 将req.body.friendList.email的多条记录和req.body.myemail插入到friendList表中
        //         for (let i = 0; i < req.body.friendList.length; i++) {
        //             friendList.create({
        //                 email: req.body.myemail,
        //                 friendEmail: req.body.friendList[i].email,
        //                 productID: req.body.friendList[i].productID
        //             },{
        //                 where: {
        //                     // 查看数据库是否有这条数据


        //                 }
        //             }).then((data) => {
        //                 res.send({
        //                     status: 0,
        //                     message: '添加成功'
        //                 })
        //             }).catch((err) => {
        //                 console.log(err);
        //             })
        //         }
        //     })
        // }else{
        //     res.send({
        //         status: 1,
        //         message: '添加失败'
        //     })

        for (let i = 0; i < req.body.friendList.length; i++) {
            console.log(req.body.friendList[i]);        
            friendList.findOrCreate({
                where: {
                    email: req.body.myemail,
                    friendEmail: req.body.friendList[i].email,
                    productID: req.body.friendList[i].productID || null,
                },
                defaults: {
                    // 如果记录不存在，设置默认值
                    // 可根据需要添加其他字段的默认值
                    email: req.body.myemail,
                    friendEmail: req.body.friendList[i].email,
                    productID: req.body.friendList[i].productID || null
                }
            })
                .then(([friend, created]) => {
                    if (created) {
                        // 记录创建成功
                        console.log('记录创建成功');
                        res.send({
                            status: 0,
                            message: '添加成功'
                        })
                    } else {
                        // 记录已存在，不需要再插入
                        console.log('记录已存在');
                        res.send({
                            status: 1,
                            message: '添加失败'
                        })
                    }
                })
                .catch(error => {
                    // 处理错误
                    console.error('插入记录时发生错误:', error);
                });
    
        }
    }

    }catch (error) {
        console.log(error);
        res.send({
            status: 1,
            message: '添加失败'
        })
    }

})

module.exports = router