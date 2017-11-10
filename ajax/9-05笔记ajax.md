###form
		form表单作用：提交数据
		form表单中的input的name很关键，是前后端约定的字段
		缺点：提交数据，会跳转页面
			
		action 要提交的地址
		method 提交方式
			get  
			post

		get和post区别的时候，是在浏览器的讨论范围内
		enctype enctype属性规定在发送到服务器之前应该如何对表单数据进行编码。
			默认：application/x-www-form-urlencoded
			text/plain 文本
			multipart/form-data 编码为二进制的，上传文件
###get和post的区别，讨论的范围的是浏览器 
**get 方式**

	http://localhost:8088/backend/php/get.php?user=leo123&password=222
	发送数据的方式
		在地址栏中?的后面，就是查询信息
			key=value&lkey2=value2&key3=value3 成为为queryString
	浏览器对地址有长度有限制
		所以get的数据会有限制
	不安全，发送一些无关紧要的
		浏览器好缓存地址

**post**

	http://localhost:8088/backend/php/post.php
	发送数据的方式
		放在HTTP的请求body（主体）发送的
	理论上没有大小限制
		服务端会有限制
	理论上是安全的

设置请求头：
xhr.setRequestHeader( 'Content-Type',
			'application/x-www-form-urlencoded');


###ajax
>AJAX即“Asynchronous Javascript And XML”（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。
>
>当在浏览器打开html页面，浏览器有内核会把html解析并渲染（显示）网页，不是看的一堆的文本

>**作用：**
>
*	1. 发送数据和服务器进行交互	
*	2. 实现异步更新，不需要刷新整个页面，只做局部更新

>**open参数** (作用：连接地址，准好数据)：
>
*	1. 请求方式 get | post 不区分大小写
*	2. 发送的地址
*	3. 是否异步 true异步 false 同步


>**ajax的请求和响应是需要时间**
>
        如果写成异步的，无论ajax回来没回来，先执行ajax以下的代码
        如果写成同步的，等ajax回来之后，才能执行后面的代码

>
>**同步**
>
	在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个执行将会一直等待下去，直到收到返回信息才继续执行下去
>
>**异步**
>	
	不需要一直等下去，而是继续执行下面的操作，不管其他执行的状态。当有消息返回时系统会进行通知处理，这样可以提高执行的效率。

>**状态码**
>
	200 ok 
	304 Not Modified
	404 Not found
	502 Bad Gateway


	<body>
        <h2>注册get-ajax</h2>
			用户名：<input type="text" name="user" id="username" /><span id="tip"></span>
			<br/>
			密码：<input type="password" name="password" /><br/>
			<input type="button" id="send" value="提交">
        <script>
            username.onblur = function(){
				------------get--------------
                //1.发送请求，得到ajax
                // 向后端发送数据，查询名字是否存在
				// 和服务器进行交互
                let xhr = new XMLHttpRequest();
                //2.链接地址，准备好数据
                /*
					open 连接地址，准好数据
						参数：
							请求方式 get|post 不区分大小写
							发送的地址
							是否异步 true异步 false 同步
				*/
                xhr.open('get','http://localhost/9-05/backend/php/get.php?user='+username.value,true)
                //4.响应回来触发onload事件
                xhr.onload = function(){
                    console.log('我执行回来了')
                    console.log(xhr.responseText)
                }
                //3.发送
                xhr.send()
            }
				

			-------------post-------------------
			username.onblur = function(){
                let xhr = new XMLHttpRequest();
                xhr.open('post','http://localhost/9-05/backend/php/post.php',true)
                xhr.onload = function(){
                    // 无论成功不成ajax都会返回的
                    if(xhr.status >= 200 || xhr.status <= 307){
                        console.log(xhr.status)
                        console.log('我执行回来了')
                        console.log(xhr.responseText)
                    }else if(xhr.status === 404){
                        console.log(xhr.status,xhr.statusText)//状态码 状态短语
                    }else if(xhr.status === 502){
                        console.log('服务器有问题')
                    }
                    
                }
				// 设置一个请求头部 设置内容的类型
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
                xhr.send('user='+username.value)
            }

			
        </script>
    </body>
###ajax工作流程
>初始化,未发送    0
>			
*	UNSENT
>
>准备数据,连接地址	1
>
>*	OPENED
>
>返回响应头		2	
>
>*	HEADERS_RECEIVED   未返回内容，只返回了响应头
>
>接收数据中		3	
>
>*	LOADING            返回内容，数据量大，分批返回
>
>接收数据完毕		4	
>
>*  DONE               数据完全接受完成

		<script>
			------------工作流程----------------
			username.onblur = function(){
                let xhr = new XMLHttpRequest();
				console.log(xhr.readyState);	
				xhr.open(
					'get',
					'http://localhost/9-05/backend/php/get.php?user='+username.value,
					true
				);
                console.log(xhr.readyState);
                // 监控ajax每一个步骤，ajax每进行一步都会触发这个事件
                xhr.onreadystatechange = function(){
                    // if(xhr.readyState === 4){// 相当于触发了onload
                    //     console.log(xhr.readyState);
                    // }
                    console.log(xhr.readyState);
                    console.log(xhr.getAllResponseHeaders())
                    console.log(xhr.responseText)
                }
                // 只要触发onload，ajax的步骤已经进行到了第五步，也就是xhr.readyState = 4；
				// 数据完全接完成，拿数据做事情了
                xhr.onload = function (){
					console.log("ajax回来了");	
					console.log(xhr.readyState,"c");
				};
                xhr.send();	
            }
		</script>

###ajax封装
	<body>
        <h2>注册get-ajax</h2>
			用户名：<input type="text" name="user" id="username" /><span id="tip"></span>
			<br/>
			邮箱：<input type="text" name="email" id="email" />
			<br/>
			密码：<input type="password" name="password" /><br/>
            <input type="button" id="send" value="提交">
        <script>
            /*
				url 发送的地址  必填项
				method 方式      可选 默认是get
				data 发送数据    可选 默认是''
			*/
            function ajax(options){
                let defaults = Object.assign({
                    url:'',
                    method:'get',
                    data:'',
                    success(){},
                    error(){}
                },options)
                if(!defaults.url){
                    throw new Error('这个地址不能为空')// 抛出错误
                }
                let xhr = new XMLHttpRequest();
                if(defaults.method.toLowerCase() === 'get'){// 是get请求要把data放在地址后面
                    defaults.url = defaults.url+'?'+defaults.data;
                }
                xhr.open(defaults.method,defaults.url,true);
                xhr.onload = function(){
                    if(xhr.status === 200){
                        defaults.success(xhr.responseText)
                    }else{
                        defaults.error(xhr.status,xhr.statusText)
                    }
                }
                if(defaults.method.toLowerCase() === 'get'){
                    xhr.send();
                }else if(defaults.method.toLowerCase() === 'post'){
                    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
                    xhr.send(defaults.data);
                }
                
            }
            let username = document.getElementById('username');
            username.onblur = function(){
                ajax({
                    url:'http://localhost/9-05/backend/php/get.php',
                    data:'user='+username.value,
                    success(data){
                        console.log(data)
                    },
                    error(status,statusText){
                        console.log(status,statusText)
                    }
                })
            }
            email.onblur = function(){
                ajax({
                    url:'http://localhost/9-05/backend/php/post.php',
                    method:'post',
                    data: 'user='+email.value,
                    success(data){
                        console.log(data)
                    },
                    error(status,statusText){
                        console.log(status,statusText)
                    }
                })
            }
        </script>
    </body>