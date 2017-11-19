let fs = require('fs');

let arr = [
	{
		name:'momo',
		age: 22
	}
]

// 判断文件是否存在的。
let aa = fs.existsSync('./data/users.json');

// 默认的flag是w： 以写入模式打开文件。文件会被创建（如果文件不存在）或截断（如果文件存在）。
/*fs.writeFile('./data/users.json', 'miaov123' ,{flag: 'wx'},(err,data) => {
	console.log(err,data);
})*/
if(aa){//存在
	let d = fs.readFileSync('./data/users.json');
	let d2 = d.toString()
	let d3 = JSON.parse(d2)
	fs.writeFile('./data/users.json',JSON.stringify([...d3,...arr]),{flag:'w'},(err,data)=>{
		console.log(err,data)
	})
}else{//不存在
	fs.writeFile('./data/users.json',JSON.stringify(arr),{flag:'wx'},(err,data)=>{
		console.log(err,data)
	})
}