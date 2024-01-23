const msg = require('../database/message')
const moment = require('moment');
const Sequelize = require('sequelize');
const { Op } = require('sequelize')
const user = require('../database/user')
const fs = require('fs')
const path = require('path')



exports.login = function login(socket, socketInfo) {
    socket.on('login', (data) => {
        console.log(data.email);
        let info = {
            email: data.email,
            socket: socket
        }
        console.log(info.email + '已经上线');
        socketInfo.push(info)
    })
}

exports.logout = function logout(socket, socketInfo) {
    socket.on('logout', (data) => {
        socketInfo.forEach((item, index) => {
            if (item.socketID === socket.id) {
                socketInfo.splice(index, 1)
            }
        })
    })
}


exports.sendMsg = function sendMsg(socket, socketInfo) {

    socket.on('sendMsg', async (data) => {
        console.log(data);
        try {
            // 将消息存入数据库
            if (data.type == 'text') {
                await msg.create({
                    sender: data.sender,
                    receiver: data.receiver,
                    msg: data.msg,
                    datatime: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
                    productID: data.productID || null,
                    type: data.type
                }).catch((err) => {
                    console.log('存储失败' + err);
                    socket.emit('sendMsg', {
                        error: err
                    });
                })

                await socketInfo.forEach((item) => {
                    if (item.email === data.receiver) {
                        console.log("找到了" + data.receiver);
                        item.socket.emit('msg', {
                            sender: data.sender,
                            msg: data.msg,
                            receiver: data.receiver,
                            data: new Date().toLocaleDateString(),
                            type: data.type,
                            productID: data.productID || null
                        })
                    }
                })

            } else if (data.type == 'image') {
                // 将blob类型的data.msg图片存储到./public/msgImage
                const time = new Date().getTime();

                const base = data.msg
                const base64 = base.replace(/^data:image\/\w+;base64,/, "");

                // let filePath = `../public/msgImage/${time}`
                // if(data.fileName){
                //     filePath=filePath+data.fileName
                // }
                const fileName = `${time}${data.fileName}`

                const filePath = path.join(__dirname, '../public/msgImage', fileName)


                // 将arrayBuffer写入文件
                // const buffer = Buffer.from(arrayBuffer);
                await fs.promises.writeFile(filePath, base64, 'base64').then(async () => {
                    console.log('File saved successfully');

                    await msg.create({
                        sender: data.sender,
                        receiver: data.receiver,
                        msg: fileName,
                        datatime: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
                        productID: data.productID || null,
                        type: data.type
                    }).catch((err) => {
                        console.log('存储失败' + err);
                        socket.emit('sendMsg', {
                            error: err
                        });
                    })

                }).catch((error) => {
                    console.error('Error saving file:', error);
                });

                await socketInfo.forEach((item) => {
                    if (item.email === data.receiver) {
                        console.log("找到了" + data.receiver);
                        item.socket.emit('msg', {
                            sender: data.sender,
                            msg: `http://localhost:80/msgImage/${fileName}`,
                            receiver: data.receiver,
                            data: new Date().toLocaleDateString(),
                            type: data.type
                        })
                    }
                })

            }

            // 求未读信息数量
            msg.count({
                where: {
                    receiver: data.receiver,
                    isRead: 0
                }
            }).then((count) => {
                console.log(count.toString());
                socketInfo.forEach((item) => {
                    if (item.email === data.receiver) {
                        console.log("找到了" + data.receiver);
                        item.socket.emit('unread', count)
                    }
                })
            })

        } catch (err) {
            console.log(err);
        }
        // 遍历socketInfo数组

    })

    exports.getMessage = function getMessage(socket, socketInfo) {
        socket.on('getMessage', function (data) {
            console.log(data);
            let person = data

            user.findOne({
                where: {
                    Email: person.sender
                },
                attributes: ['admin']
            }).then(admin => {
                // 如果是管理员身份
                if (admin.admin == 1) {
                    msg.findAll({
                        where: {
                            [Op.or]: [
                                {
                                    [Op.and]: [
                                        { receiver: data.receiver },
                                        { sender: data.sender },
                                        // { productID: data.productID || null }
                                    ]
                                },
                                {
                                    [Op.and]: [
                                        { receiver: data.sender },
                                        { sender: data.receiver },
                                        // { productID: data.productID || null }
                                    ]
                                }
                            ]
                        },
                        order: [['id', 'ASC']],
                    }).then((data) => {
                        console.log(data);
                        if (data.length != 0) {

                            data.forEach((item) => {
                                if (item.type == 'image') {
                                    item.msg = `http://localhost:80/msgImage/${item.msg}`
                                }
                            })


                            let obj = socketInfo.find(item => item.email === person.sender)
                            console.log(obj + '1111111111111111111111111111');
                            if (obj) {
                                console.log('发送了22222222222222');
                                obj.socket.emit('getMsg', data)
                            } else {
                                console.log('找不到' + data[0].sender);
                            }
                        }
                    })
                    // 如果是用户身份
                } else {
                    msg.findAll({
                        where: {
                            // receiver: data.receiver,
                            // sender: data.sender,        
                            // productID:data.productID || null

                            [Op.or]: [
                                {
                                    [Op.and]: [
                                        { receiver: data.receiver },
                                        { sender: data.sender },
                                        { productID: data.productID || null }
                                    ]
                                },
                                {
                                    [Op.and]: [
                                        { receiver: data.sender },
                                        { sender: data.receiver },
                                        { productID: data.productID || null }
                                    ]
                                }
                            ]
                        },
                        order: [['id', 'ASC']]
                    }).then((data) => {
                        console.log(data);
                        if (data.length != 0) {

                            data.forEach((item) => {
                                if (item.type == 'image') {
                                    item.msg = `http://localhost:80/msgImage/${item.msg}`
                                }
                            })

                            let obj = socketInfo.find(item => item.email === person.sender)
                            console.log(obj + '1111111111111111111111111111');
                            if (obj) {
                                console.log('发送了22222222222222');
                                obj.socket.emit('getMsg', data)
                            } else {
                                console.log('找不到' + data[0].sender);
                            }
                        }
                    })
                }
            })

        })
    },
        exports.reconnect = function reconnect(socket, socketInfo) {
            socket.on('reconnect', (data) => {
                // 查看socketInfo数组中是否有data.email
                let info = socketInfo.find(item => item.email === data.email)
                if (info) {
                    console.log('重新赋值socketID');
                    // 如果有就将socket赋值给info.socket
                    info.socket = socket
                }

            })
        },
        exports.getUnreadMsg = function getUnreadMsg(socket, socketInfo) {
            socket.on('unread', function (data) {
                msg.count({
                    where: {
                        receiver: data.receiver,
                        isRead: 0
                    }
                }).then((count) => {
                    console.log(count.toString());
                    socketInfo.forEach((item) => {
                        if (item.email === data.receiver) {
                            item.socket.emit('unread', count)
                        }
                    })
                })
            })
        },

        exports.getMesageNum = function getMesageNum(socket, socketInfo) {
            socket.on('getMsgNum', async function (data) {

               if(data.length==0) return
                const count = []

                for (const item of data) {

                 await   user.findOne({
                        where: {
                            Email: item.myEmail
                        },
                        attributes: ['admin']
                    }).then(async admin => {
                        // 如果是管理员身份
                        if (admin.admin == 1) {
                            const dataCount = await msg.count({
                                where: {
                                    sender: item.email,
                                    receiver: item.myEmail,
                                    isRead: 0
                                }
                            });
                        
                            count.push({
                                email: item.email,
                                num: dataCount,
                                admin:admin.admin
                            });
                        
                            console.log(dataCount);
                        }else{
                            const dataCount = await msg.count({
                                where: {
                                    sender: item.email,
                                    productID:item.productID,
                                    receiver: item.myEmail,
                                    isRead: 0
                                }
                            });
                        
                            count.push({
                                email: item.email,
                                num: dataCount,
                                admin:admin.admin,
                                productID:item.productID
                            });
                        
                            console.log(dataCount);
                        }
                    })
                    
                }

                await   socketInfo.forEach((item) => {
                    if (item.email === data[0].myEmail) {
                        console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddd');
                        item.socket.emit('getMsgNum', count)
                    }
                })



            })
        }
}