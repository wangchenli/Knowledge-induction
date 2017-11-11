###JSON
>JSON是字符串,JSON 全局的对象，专门用来处理JSON数据格式的
>
>需要操作JSON字符串  转成可操作的对象   json字符串 -> 对象
>
>*   JSON.parse(json)
>
>要向后端发送数据,把对象转成json字符串,stringify 最后一个参数，是格式化的缩进的空格数量，最大是10
>
>**JSON.stringify(obj2,null,4)**
>
>**参数**

> * 第一个参数：是一个过滤器，（要转的对象，可以是数组）
> * 第二个参数： 
> * 第三个参数：缩进的空格数
>
>**JSON字符串必须使用双引号，使用单引号会报语法错误**


		<script>
			//请求返回的json数据
            let xhr = new XMLHttpRequest();
            xhr.open(
                'post',
                'http://localhost/9-06/backend/php/post_json.php',
                true
            )
            // 每一步进行 ie6,ie7
			xhr.onreadystatechange = function (){};
            xhr.onload = function(){
                console.log(typeof xhr.responseText) //string
                console.log(xhr.responseText)
                console.log(JSON.parse(xhr.responseText)) 
            }
            xhr.setRequestHeader('Content-Type',
            'application/x-www-form-urlencoded'
            )
            xhr.send('user=leo1')

			--------------------------------

            // JSON是字符串,JSON 全局的对象，专门用来处理JSON数据格式的
            let json = '{"username":"leo","age":"30"}';

            // 需要操作JSON字符串  转成可操作的对象   json字符串 -> 对象		
            let obj = JSON.parse(json)
            console.log(obj)//Object {username: "leo", age: "30"}

            // 要向后端发送数据
            let obj2 = {aa:1,bb:3};
            // 把对象转成json字符串,stringify 最后一个参数，是格式化的缩进的空格数量，最大是10
            let str = JSON.stringify(obj2,null,4);
            console.log(str)
        </script>

###下载
>有这个文件夹，路径要对


		<a href="./2017-09-06.zip">2017-09-06.zip</a> 

##上传
>js是不能读取文件的，只有服务器的语言才能读取文件，如果js能读取就乱了，因为js是浏览器的脚本语言，如果js可以读取，发给别人一个html，别人一打开我就可以读取他电脑上的信息

>**所有的上传都是post方法**

>上传时都是把读取的文件转成二进制形式传给服务器，服务器再解码

>上传到服务器。服务器有一个地方专门存放

####**form表单上传**
>action里是请求的接口地址

>method是请求方法

>enctype是数据的形式：因为上传时都是把读取的文件转成二进制形式传给服务器
所以用multipart/form-data，编码为二进制的，上传文件



		<form 
            action="http://localhost/9-06/backend/post_file.php"
            method="post"  
            enctype="multipart/form-data"
        >
            <input type="file" name="file" />
            <input type="submit" value="上传" />
        </form>	




####**ajax上传（style样式参考9-06笔记）**
>**FormData对象**
>
>*    通过FormData对象可以组装一组用 XMLHttpRequest发送请求的键/值对。

>*    如果你把表单的编码类型设置为multipart/form-data ，则通过FormData传输的数据格式和表单通过submit() 方法传输的数据格式相同

>**xhr.upload.onprogress**和**hr.onprogress**区别

> *   xhr.upload.onprogress在上传阶段(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；
> *   xhr.onprogress在下载阶段（即xhr.readystate=3时）触发，每50ms触发一次。



		<body>
	        <input type="file" name="file" id="fileInput" />
	        <input type="button" id="btn" value="按钮" />
	        <div id="box">
	            <p id="text">0%</p>
	            <div id="bar"></div>
	        </div>
	        <script>
	            btn.onclick = function(){
	                let xhr = new XMLHttpRequest();
	                xhr.open('post','http://localhost/9-06/backend/post_file.php',true)
	                
	                // 监控上传进度
	                xhr.upload.onprogress = function(ev){
	                    console.log(ev.loaded,ev.total)// 上传大小,总大小	
	                    console.log(Math.round(ev.loaded/ev.total*100)+'%')
	                    let bili = ev.loaded/ev.total;
	                    text.innerHTML = Math.round(ev.loaded/ev.total*100)+'%';
	                    bar.style.width = bili*500 + 'px';
	                }
	                
	                console.log(fileInput.value) //C:\fakepath\1-ajax.html,图片所在的地址
	                console.dir(fileInput)
	                console.log(fileInput.files[0])// 真正上传的资源，放在元素的files属性中
	                
	                // 高版本浏览器 FormData
	                let f = new FormData();
	                f.append('file',fileInput.files[0])
	                xhr.send(f)
	            }
	        </script>
	    </body>

##跨域

	
**同源策略**

>*    同源策略（Same origin policy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。

**同源**

>*	域名，协议，端口相同。

>*	有一个不同，就形成跨域

**域名  是ip的别名（小名）**

>* 一级域名：
	* baidu.com  taoba.com  gome.com.cn  
>* 二级域名
	* news.baidu.com/              
	* git.oschina.net/
>* 三级域名
	* abc.news.baidu.com/

**协议 服务器（客户端）进行通信的一种约定**

>*    https
>*    http
>*    ftp
>*    file

**端口**

>*    https  443
>*    http 80
>*    ftp  22
>*    file 不知道


##解决跨域
####方法1：设置允许跨域的头部
> 
> 在请求的这个域上设置一个header
> 
> 比如http://localhost:3000/访问http://localhost:8888/test  会产生跨域
> 
> 在http://localhost:8888/这个域下设置header，允许3000来访问
> 
> 设置允许3000端口访问

> res.header("Access-Control-Allow-Origin", "http://localhost:3000");
> 
> 设置允许所有端口访问
> 
> res.header("Access-Control-Allow-Origin", "*");


>不同的语言有不同的设置方法，这里是node.js的设置方法


####方法2：代理

**请求自己域下的后端，自己域下的后端请求目标域的接口**

> 比如http://localhost:3000/访问http://localhost:8888/test  会产生跨域
> 
> http://localhost:3000/访问http://localhost:3000/abc.php
> 
> 让http://localhost:3000/abc.php 去访问http://localhost:8888/test

**原理**

> * 后端不存在跨域
> * 请求自己域下的后端，自己域下的后端请求目标域的接口
> * 但是后端存在安全限制，某些重要的接口不能访问，即使不能访问，但是也已经成功跨过去了

**例子**

		<input type="button" value="获取数据" id="btn" />


		btn.onclick = function (){
			let xhr = new XMLHttpRequest();	
			xhr.open(
				'get',
				'http://localhost:3000/backend/get_sae.php/?'+Math.random(),
				true
			)
			
			//http://localhost:3000/访问http://localhost:3000/get_sae.php


			xhr.onload = function (){
				console.log(xhr.responseText);	
			};

			xhr.send();
		};

		
		//让http://localhost:3000/get_sae.php 去访问http://localhost:8888/4-test.txt

		<?php
		$content = file_get_contents('http://localhost/miaov/2017-09-06/js/4-test.txt');
		
		echo $content;

####jsonp

>jsonp = json + padding
>
>那些标签允许跨域访问：
>
*	img script a link 
>
>这些标签不在乎给的后缀是什么？在乎的是能不能解析里面的内容
>
>*    img 需要的src能被解析为图片,并不关心src里是不是图片的url地址
>
>*    script 内容能不能js解释器解析,并不关心src里是不是js文件，链接一个txt文件，txt里的js语法依然能被解析，从而在浏览器里展示交互效果
>
>*    link 内容能不能被css解释器解析
>
>**php比较特殊**
>
> * php如果在本地打开，php不能被解析；
> 在服务器环境打开，php解析器解析，输出alert('hello'),这条代码是js语法，被js解析器解析，弹出'hello'


**用json填充数据**

> 1. 先创建一个script标签，src赋值地址
> 2. 访问的地址返回数据，数据中会有一个函数的执行
> 3. 在全局放一个函数，返回了数据，数据中会有函数执行，就会执行这个函数
> 4. 可以通过函数的参数拿到所需要的数据


**图片转为base64，不用发请求，小的图片文本比较少，可以用base64**


**小例子**

>* 什么时候加载了4-test.txt文件？
	* 4-test.txt里调用一个函数abc（函数abc在全局定义好，时刻准备着）
>* 怎么拿到4-test.txt文件里面的数据？
	* 当加载了4-test.txt文件时，txt里的js语法被js解析器解析，abc函数被调用，传入实参obj，在全局，函数abc打印出传进来的

		<p>姓名为：<span id="name">momo</span></p>
		<script>
			// 在全局放一个函数
			function abc(data){
				console.log(data);
			}



			// 点击document，拿到4-text中的数据
			document.onclick = function (){
				let script = document.createElement("script");
				script.src = './js/4-test.txt';
				document.body.appendChild(script);

			};
		</script>

	**分析**

		4-test.txt里的内容

			let obj = {
				username:'leo'
			}
			
			// 执行函数
			abc(obj)


###百度搜索例子，用跨域请求百度的接口
		<style>
            *{
                margin: 0;
                padding: 0;
                list-style: none;
                text-decoration: none;
            }
            #box{
                width: 500px;
                margin: 100px auto;
            }
            #box input{
                width: 100%;
                height: 30px;
            }
            #box ul{
                width: 100%;
                border: 1px solid paleturquoise;
            }
            #box ul li{
                width: 100%;
                height: 20px;
                padding: 5px 0;
            }
            #box ul li:hover{
                background: #ccc;
            }
            
        </style>
		<body>
	        <div id="box">
	            <input type="text" id="$input" />
	            <ul id="list">
	                <!-- <li>
	                    <a href=""></a>
	                </li> -->
	            </ul>
	        </div>
	        <script>
	            function fn(data){
	                //console.log(data.s)
	                let s = data.s;
	                let html = s.map(function(item){
	                    return `<li>
	                                <a href="https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${item}">${item}</a>
	                            </li>`
	                })
	                list.innerHTML = html.join('');
	            }
	            $input.oninput = function(){
	                let script = document.createElement('script');
	                script.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${this.value}&json=1&p=3&sid=1427_21085_20930&req=2&pbs=%E7%99%BE%E5%BA%A6&csor=4&pwd=bai&cb=fn&_=1504701933418`
	                document.body.appendChild(script)
	            }
	        </script>
	    </body>

###QQ音乐例子，用跨域请求QQ音乐的部分接口
		<style>
			*{
				padding: 0;
				margin: 0;
                list-style: none;
                text-decoration: none;
			}
			#box {
				margin: 50px auto;
			}

			#box input {
				width: 100%;
				height: 30px;
			}
			#box ul {
				border: 1px solid #333;
			}
			#box ul li:hover {
				background: #ccc;
			}
			#list li {
				width: 20%;
			    position: relative;
			    margin-right: 20px;
			    background-color: #fbfbfd;
			    min-height: 195px;
			    padding: 25px 0;
			    overflow: hidden;
			    float: left;
                box-sizing: border-box;
			}
			#list a {
			    display: block;
			    width: 140px;
			    height: 140px;
			    border-radius: 126px;
			    overflow: hidden;
			}
            #list h3{
                overflow: hidden;
            }
            
		</style>
		<body>
	        <div id="box">
	            <input type="text" id="$input" />
	            <ul id="list">
	                 <!-- <li>
	                    <a href="">
	                        <img src="//y.gtimg.cn/music/photo_new/T001R150x150M000002J4UUk29y8BY.jpg?max_age=2592000" />
	                    </a>
	                    <h3>薛之谦</h3>
	                 
	                </li>  -->
	            </ul>
	        </div>
	        <script>
	            /*
	            {
	                "Farea": "1",
	                "Fattribute_3": "3",
	                "Fattribute_4": "0",
	                "Fgenre": "0",
	                "Findex": "X",
	                "Fother_name": "Joker",
	                "Fsinger_id": "5062",
	                "Fsinger_mid": "002J4UUk29y8BY",
	                "Fsinger_name": "薛之谦",
	                "Fsinger_tag": "541,555",
	                "Fsort": "1",
	                "Ftrend": "0",
	                "Ftype": "0",
	                "voc": "0"
	    https://y.qq.com/n/yqq/singer/002J4UUk29y8BY.html#
	    https://y.qq.com/n/yqq/singer/0025NhlN2yWrP4.html#  
	            }
	            */
	            function fn(data){
	                let d = data.data.list;
	                let html = d.map(function(item){
	                    return `<li>
	                                <a href="https://y.qq.com/n/yqq/singer/${item.Fsinger_mid}.html#">
	                                    <img src="//y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000" />
	                                </a>
	                                <h3>${item.Fsinger_name}</h3>
	                            </li>`
	                })
	                list.innerHTML = html.join('');
	            }
	            $input.oninput = function(){
	                let script = document.createElement('script');
	                script.src = `https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=5381&jsonpCallback=fn&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`;
	                document.body.appendChild(script);
	            }
	        </script>
	    </body>