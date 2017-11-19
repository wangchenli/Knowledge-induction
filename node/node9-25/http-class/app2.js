let http = require('http');
let fs = require('fs')
let app = http.createServer((req,res)=>{
	let url = req.url;
	/*
		路径是否有后缀，有后缀看是js,css,png,gif jpg
	*/
	let re = /\.(js|css)$/g;
	if(re.test(url)){
		// 静态目录static
		let d = fs.readFileSync('./static'+url);
		console.log(d.toString(),url)
		res.end(d)
	}else{
		if(url === '/a'){
			let d = fs.readFileSync('./views/index.html');
			res.end(d)
		}else if(url === '/b'){
			let d = fs.readFileSync('./views/miaov.html');
			res.end(d)
		}else{
			let d = fs.readFileSync('./views/404.html');
			res.end(d)
		}
	}


})
app.listen(3000,()=>{
	console.log('success')
})