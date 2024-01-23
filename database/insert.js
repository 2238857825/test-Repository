const User=require('./products')
// const pro= User.create({
//     name:'鱼竿',
//     category:'钓竿',
//     price:100,
//     description:'钓鱼用的竿子',
//     manufacturer:'中国',
//     material:'碳素',
//     length:3,
//     weight:0.5,
//     color:'黑色',
//     stock_quantity:100,
//     display_image:''
// })

// 查询商品
User.findAll({
    attributes:['display_image']
}).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})
