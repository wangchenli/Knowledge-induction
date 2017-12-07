#ES6的开发环境搭建
##使用Babel把ES6编译成ES5
###先建立一个项目的工程目录，并在目录下边建立两个文件夹：src和dist

>src：书写ES6代码的文件夹，写的js程序都放在这里。
>
>dist：利用Babel编译成的ES5代码的文件夹，在HTML页面需要引入的时这里的js文件。
>
>index.html
>
*	需要注意的是在index.html中引入js文件时，引入的是dist目录下的文件。
*	< script src="./dist/index.js" >< /script >

###初始化项目
>在安装Babel之前，需要用npm init先初始化项目。打开终端或者通过cmd打开命令行工具，进入项目目录，输入下边的命令：
>
*	npm init -y

>y代表全部默认同意，就不用一次次按回车了。命令执行完成后，会在项目根目录下生产package.json文件。

###全局安装Babel-cli
>*	npm install -g babel-cli

###本地安装babel-preset-es2015 和 babel-cli
>*	npm install --save-dev babel-preset-es2015 babel-cli

###全局新建.babelrc

	{
	    "presets":[
	        "es2015"
	    ],
	    "plugins":[]
	}

####这个文件我们建立完成后，现在可以在终端输入的转换命令了，这次ES6成功转化为ES5的语法。
**babel src/index.js -o dist/index.js**
