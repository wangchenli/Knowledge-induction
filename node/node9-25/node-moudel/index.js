//这是一个模块

let u = require('./utils.js')
//console.log(u) //打印出utils.js中暴露出来的两个函数add和isFn

let http = require('http')
//console.log(http)

let fs = require('fs')
//console.log(fs)

// 别人提供的模块，是第三方模块
let $ = require('jquery');
//console.log($) //function

//自己定义的第三方模块，在miaov这个文件夹中npm init安装一下package.json，进去里面main这个属性改一下路径，就可以打印出index.js中的内容
let miaov = require('miaov');
console.log(miaov)