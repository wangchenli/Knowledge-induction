let express = require('express');
let app = express();
let bodyParser = require('body-parser')
const multer  = require('multer');  // 处理上传的模块

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads/'); // 设置存储的位置
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //存储文件的名字
  }
})
var upload = multer({ storage }); // 指定上传的信息





app.use(express.static('./publish'))
// for parsing application/json
app.use(bodyParser.json());  // 客户端发送过来的json格式
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 



app.use(function(req,res,next){
  console.log('hello,中间件')
  //res.send('hi')
  next()
})
app.use(function(req,res,next){
  console.log('hello,中间件1')
  //res.send('hi')
  next()
})

app.get('/',(req,res) => {
  // console.log('有请求来了');
  // res.status(200);
  // res.send('响应了')
  res.sendFile(__dirname+'/views/index.html')

})
app.get('/miaov',(req,res) => {
  if(true){
    res.redirect('/login')
  }else{
    res.sendFile(__dirname+'/views/miaov.html')
  }

})
app.get('/ketang',(req,res) => {
  res.sendFile(__dirname+'/views/ketang.html')

})
app.get('/login',(req,res) => {
  res.sendFile(__dirname+'/views/login.html')

})

const userApi = require('./api/index.js');
app.use('/api',userApi)


// APi用来做上传的
app.post('/upload',upload.single('miaov'), (req, res) => {
	res.send('上传ok')
})


//let host = '';
app.listen('3000',()=>{
  console.log('haha')
})