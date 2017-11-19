
let http = require('http');
let fs = require('fs');

// 创建服务
let app = http.createServer((req,res) => {
	// 请求的是那个页面，index.html,响应的时候怎么做？

	// 读取index.html这个页面的内容，发送给客户端

	console.log(req.url) //拿到地址的路径
	if(req.url === '/index.html'){
		// 返回index.html，需要读取index.html里面的内容发送
		getData('./views/index.html',function(data){
			console.log(data)
			res.write(data);
			res.end();
		})
	}else if(req.url === '/miaov.html'){
		getData('./views/miaov.html',function(data){
			console.log(data)
			res.write(data);
			res.end();
		})
	}
})

app.listen(3000,()=>{
	console.log('服务启动了')
})

function getData(path,callback){
	fs.readFile(path,(error,data)=>{
		if(error){
			console.log(error)
		}else{
			callback(data)
		}
	})
}