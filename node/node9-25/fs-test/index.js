let fs = require('fs');

//异步形式
fs.readFile('./abc.txt',(err,data) => {
	if(err){
		console.log(err)
	}else{
		console.log(data.toString())
	}
})
console.log('我先执行')

//同步形式

// 使用同步方法，报错了，下面代码是不执行的
// 捕获错误，使用try，catch
try{
	let d = fs.readFileSync('./abcde.txt')
	console.log(d.toString())
}catch(err){
	console.log(err)
}

console.log('wo zhixing l')
