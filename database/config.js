const {Sequelize,DataTypes}=require('sequelize')
const sequelize= new Sequelize('fisherman','root','ROOT',{
    host:'localhost',
    dialect:'mysql',
    logging:console.log
})
// try{
//     sequelize.authenticate();
//     console.log('连接成功');
// }catch(err){
//     console.log('连接失败'+err);
// }
module.exports=sequelize