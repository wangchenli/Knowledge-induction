let express = require('express');// expres是一个函数
let app = express(); // 得到一个对象
let bodyParser = require('body-parser')//响应前端请求时post请求的数据

// console.log(__dirname);  // 得到当前运行的js文件所在的绝对路径
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件


//--------------------------------------------------------上传的配置
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

//-------------------------------模板引擎
let swig = require('swig');// 用到模板引擎，把index.html作为模板
app.set('views', './views'); // 设置模板存放的位置 在views这个文件夹下
app.engine('html', swig.renderFile)// 定义模板引擎使用swig.renderFile这个函数渲染，同时后缀名为html
app.set('view engine', 'html')// 注册模板引擎，views目录下的以html为后缀的模板都用swig.renderFile渲染


//中间件
app.use(express.static('./publish'))// 设置静态文件的目录


//-----------------------------解析post数据的配置
app.use(bodyParser.json());  // 客户端发送过来的json格式
app.use(bodyParser.urlencoded({ extended: true })); // 解析客户端发送的key=value&key=value
// app.use(multer()); // for parsing multipart/form-data


// 写上路径，是特定的额路径触发这个中间件
/*app.use(function(req,res,next){
  console.log('hello,中间件')
  //res.send('hi')
  next()
})*/
app.use(function(req,res,next){
  // console.log('hello,中间件1')
  // //res.send('hi')
  // next()
  let mustLogin = ['/miaov','/a',"/b"];

	if(mustLogin.includes(req.url)){
		if(true){ // 没登录
			res.redirect('/login') //redirect重定向
		}else{
			next();	
		}
	}else{
		next();	
	}

})

//用模板引擎向前端返回页面
let user = {
  name:'momo',
  age:20,
  sex:'男'
}
app.get('/',(req,res) => {
  // console.log('有请求来了');
  // res.status(200);
  // res.send('响应了')
  //res.sendFile(__dirname+'/views/index.html')
  res.render('index',{
    user:user,
    list:[1,2,3,4]
  })
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

//引入api这个文件夹下的index.js
const userApi = require('./api/index.js');
app.use('/api',userApi) //加载这个模块


// APi用来做上传的   miaov要与from表单中的name保持一致
app.post('/upload',upload.single('miaov'), (req, res) => {
	res.send('上传ok')
})



// app.listen('3000',()=>{
//   console.log('haha')
// })


//-----------------------------启动时端口和ip配置
/*	
app.listen(port[,host,callback])
*/
//http://192.168.0.104:3000/
let host = '192.168.0.104';
let port = 3000;
app.listen(port,host,()=>{
  console.log('http://'+host+':'+port) 
})