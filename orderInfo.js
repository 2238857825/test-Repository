const router=require('./express')
const info=require('./database/img_detial')

router.get('/info',(req,res)=>{
    console.log(req.query);

   if(req.auth){
    info.findOne({
        where:{
            id:req.query.id
        }
    }).then((data)=>{
        console.log(data);
        //给每个图片加上路径
        data.img_display=`http://localhost:80/img_detial/${data.img_display}`
        res.send(data)
    }).catch((err)=>{
        console.log(err);
        res.send("失败")
    })
   }
})

module.exports=router