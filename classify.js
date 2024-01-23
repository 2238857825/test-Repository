const router=require('./express')
const products=require('./database/products')

router.get('/classify',(req,res)=>{
    console.log(req.query);

    products.findAll({
        where:{
            category:req.query.choose
        }
    }).then((data)=>{
        console.log(data);
        //给每个图片加上路径
        data.forEach((item)=>{
            item.display_image=`http://localhost:80/img_display/${item.display_image}`
        })
        res.send(data)
    }).catch((err)=>{
        console.log(err);
        res.send("失败")
    })
})

module.exports=router