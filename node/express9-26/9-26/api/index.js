const express = require('express');
const router = express.Router();

//响应前端的请求

//http://localhost:3000/api/users 页面中 可以看到 {"code":0,"message":"ok"}
router.get('/users',(req,res) => {  
  //获取get请求的数据
  console.log(req.query)

  let {random,userName} = req.query; //解构赋值
  console.log(random)
  console.log(userName)

  res.send({
    code:0,
    message:'ok'
  })
})

//post在地址栏中输/api/post-users不会再页面中响应{"code":0,"message":"hello,world"}
//在netWork中Response中查看
router.post('/post-users',(req,res) => {
  console.log(req.body)

  let {userName} = req.body;
  console.log(userName)

  res.send({
    code:0,
    message:'hello,world'
  })

})

module.exports = router;
