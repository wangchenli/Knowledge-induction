let http = require('http');
let app = http.createServer((req,res)=>{
	let url = req.url;
	if(url === '/a'){
		res.end('a')
	}else if(url === '/b'){
		res.end('b')
	}else{
		res.end('404')
	}
})
app.listen(3000,()=>{
	console.log('success')
})