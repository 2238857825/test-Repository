const router=require('./express')
const fs = require('fs')
const products = require('./database/products')
const Sequelize = require('./database/config')
const detial = require('./database/img_detial')

router.post('/update', (req, res) => {
    // console.log(req.body);

    // 


    // 将信息保存到数据库
    if (req.body !== null) {
        // 将图片从base64还原
        let base64 = req.body.img.data
        let base64Data = base64.replace(/^data:image\/\w+;base64,/, "")
        let dataBuffer = Buffer.from(base64Data, 'base64')

        // 将图片名字加上时间戳保存到本地
        let time = new Date().getTime()

        let imgName = `${time}${req.body.img.filename}`

        try {
            // 添加托管事务
            const results = Sequelize.transaction(async (t) => {
                try {
                    let s = await products.create({
                        name: req.body.name,
                        category: req.body.category,
                        price: req.body.price,
                        description: req.body.description,
                        manufacturer: req.body.company,
                        material: req.body.material,
                        length: req.body.length,
                        weight: req.body.weight,
                        color: req.body.color,
                        stock_quantity: req.body.number,
                        display_image: imgName,
                        email:req.auth.email,
                    }, {
                        transaction: t
                    })

                    const productWithId = await products.findOne({
                        attributes: ['id'],
                        where: {
                            display_image: imgName
                        },
                        transaction: t
                    });

                    if (productWithId) {
                        const id = productWithId.id;
                        console.log(id);
                        const img_display = [];

                        for (let i = 0; i < req.body.rod_img.length; i++) {
                            // 将图片从base64还原
                            const base64 = req.body.rod_img[i].data;
                            const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
                            const dataBuffers = Buffer.from(base64Data, 'base64');

                            const time = new Date().getTime();
                            const imgName = `${time}${req.body.img.filename}`;
                            req.body.rod_img[i].filename = imgName;
                            req.body.rod_img[i].img_display = imgName;
                            req.body.rod_img[i].rod_id = id; // 使用查询到的id
                            const s = {
                                rod_id: id,
                                img_display: imgName,
                                classify: req.body.rod_img[i].rod_info,
                                price: req.body.rod_img[i].rod_price
                            };
                            img_display.push(s);

                            const imagePath = `./public/img_detial/${imgName}`;
                            await fs.promises.writeFile(imagePath, dataBuffers);

                           
                        }

                        const imagePath = `./public/img_display/${imgName}`;
                        await fs.promises.writeFile(imagePath, dataBuffer);
                        

                        return await detial.bulkCreate(img_display, {
                            // fields:['rod_id','img_display','classify','price'],
                            transaction: t
                        });
                    }else{
                        return false;
                    }
                   
                } catch (error) {
                    console.log(error);
                    return false;
                }
            })
            if (results) {
                res.send("上传成功")
            } else {
                res.send("上传失败")
            }

        } catch (error) {
            console.log(error);
            res.send("上传失败")

        }
    }


})
module.exports = router