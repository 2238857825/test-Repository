const express=require('express')
const http=require('http')
 const app=express()
 const session=require('express-session')
//  导入 jsonwebtoken 包
const jwt=require('jsonwebtoken')
//  导入 express-jwt 包
// const {expressjwt:expressJwt}=require('express-jwt')
 const expressJwt=require('express-jwt')


 let server=http.createServer(app)

 let io=require('socket.io')(server,{
   cors:true,
   // 设置最大传送数据
   maxHttpBufferSize: 1e8,

})

 const secretKey='secretkey'

 var cors=require('cors')

 app.use(express.urlencoded({extended:true,limit:'50000mb'}))
//  app.use(express.json({extended:true,limit:'10mb'}))

 app.use(cors({
    credentials:true,
    origin:true
}))

   app.use(session({
      secret:'secret',
      resave:false,
      saveUninitialized:true,
      cookie:{
            maxAge:24*1000*60*60,
            secure:false
      }
   }))

   // 注册将JWT字符串还原成JSON对象的中间件
// 只要配置成功express-jwt中间件，就可以把解析出来的用户信息挂载到req.user属性上
app.use(expressJwt.expressjwt({secret:secretKey,algorithms:['HS256']}).unless({
   path:['/login','/register','/products',/^\/img_display\//,'/detial','/sendMail',/^\/avatar\//,/^\/img_detial\//,'/friend',/^\/msgImage\//]
}))


app.use(express.static(__dirname+'/public'))

const update=require('./update')
app.use(update)

const product=require('./product')
app.use(product)


const mail=require('./sendMail')
app.use(mail)

const registers=require('./register')
app.use(registers)

const login=require('./login')
app.use(login)


const detial=require('./detial')
app.use(detial)

const myinfo=require('./myinfo')
app.use(myinfo)

const classify=require('./classify')
app.use(classify)

const cart=require('./cart')
app.use(cart)

const cartadd=require('./cartadd')
app.use(cartadd)  

const orderInfo=require('./orderInfo')
app.use(orderInfo)

const pay=require('./pay')
app.use(pay)

const select=require('./select')
app.use(select)

const sendProduct=require('./sendProduct')
app.use(sendProduct)

const myorder=require('./myorder')
app.use(myorder)

const payStatus=require('./payStatus')
app.use(payStatus)

const del=require('./del_order')
app.use(del)

const waitPay=require('./waitPay')
app.use(waitPay)

const cancle=require('./cancleOrder')
app.use(cancle)

const scess=require('./scessPay')
app.use(scess)

const friend=require('./friend')
app.use(friend)

const friendList=require('./friendList')
app.use(friendList)

const getFriendList=require('./getFriendList')
const { Socket } = require('socket.io')
app.use(getFriendList)

const msgNumber=require('./msgNumber')
app.use(msgNumber)

const saveAccount=require('./admin/adminAccountSave')
app.use(saveAccount)

const getBill=require('./admin/Bill')
app.use(getBill)

const delBill=require('./admin/deleteBill')
app.use(delBill)

const getBillInfo=require('./admin/pay_detial')
app.use(getBillInfo)

const delProduct=require('./admin/delProduct')
app.use(delProduct)

const delClassify=require('./admin/delClassify')
app.use(delClassify)

const waitSend=require('./admin/waitSend')
app.use(waitSend)

const sendto=require('./admin/sendSuccess')
app.use(sendto)

const waitOrder=require('./admin/waitOrder')
app.use(waitOrder)

// 管理员权限

const account=require('./admin/adminAccount')

app.use(account)



const socketInfo=[]

// 使用io对象监听客户端的连接请求
io.on('connection',(socket)=>{
   console.log('有客户端连接到服务器');
   io.to(socket.id).emit('socketId', socket.id);

   socket.on('disconnect',()=>{
       socketInfo.forEach((item,index)=>{
           if(item.socketID===socket.id){
            console.log(item.email+'客户端断开连接了');
               socketInfo.splice(index,1)
           }
       })
   }) 
    var login=require('./tools/tool')

   login.login(socket,socketInfo)
  

   login.logout(socket,socketInfo)

   login.sendMsg(socket,socketInfo)

   login.getMessage(socket,socketInfo)

   login.reconnect(socket,socketInfo)

   login.getUnreadMsg(socket,socketInfo)

   login.getMesageNum(socket,socketInfo)

})

app.use((err,req,res,next)=>{
   if(err.name==='UnauthorizedError'){
       return res.send({status:401,message:'无效的token'})
   }
   res.send({status:500,message:'未知错误'})
})

 server.listen(80,()=>{
    console.log("已经连接服务器，正在监听:http://localhost:80");
 })