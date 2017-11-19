let express = require('express');
let app = express();
app.use(express.static('./static'));
app.get('/a',(req,res)=>{
	res.sendFile(__dirname+'/views/index.html')
})
app.get('/b',(req,res)=>{
	res.sendFile(__dirname+'/views/miaov.html')
})


app.listen(3000,()=>{
	console.log('hello')
})
