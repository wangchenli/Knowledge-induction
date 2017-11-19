let http = require('http');
let fs = require('fs');

let d = fs.readFileSync('./views/miaov.html');//同步的读取文件
console.log(d)
console.log('我先执行了')

let app = http.createServer((req,res) => {
	if(req.url === '/index.html'){

		let d = getData('./views/index.html')
		d.then((data) => {
			res.write(data);
			res.end();
		})
		

	}else if(req.url === '/miaov.html'){
		res.write(d);
		res.end()
		//getData('./views/miaov.html')
	}
})
// 函数readFilePromise的作用：传进来一个路径，返回一个Promise对象
function readFilePromise(filePath){
	return new Promise((resolve,reject) => {
		fs.readFile(filePath,(error,data) => {
			if(error){
				reject(error)
			}else{
				resolve(data)
			}
		})
	})
}
async function getData(filePath,callback){
	// 如果await后面是一个Promise对象，那么它会等待 Promise 的解析并返回解析的的值。
	// 如果await后面不是一个 Promise，它将该值转换为已解决的Promise，并等待它。
	return await readFilePromise(filePath)
}
app.listen(8000,()=>{
	console.log('服务启动了')
})