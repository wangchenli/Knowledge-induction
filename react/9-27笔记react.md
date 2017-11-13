##React
>用于构建用户界面的 JAVASCRIPT 库

> 下载html页面，里面有三个地址，保存到本地

>	1. react.development.js  -----核心代码
	
>	2. react-dom.development.js ---- 渲染DOM（如果放在浏览器平台，解析成浏览器认识的，放在安卓平台，就解析成安卓认识的）


###一个最简单的React例子如下:
>它渲染了一个 "Hello, world!" 的标题。

	ReactDOM.render(
	  <h1>Hello, world!</h1>,
	  document.getElementById('root')
	);

###JSX (javascript+XML)
>JSX 用来声明 React 当中的元素。

#####在 JSX 中使用表达式
>	可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的表达式要包含在大括号里。

#####因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。
>	例如，class 变成了 className，而 tabindex 则对应着 tabIndex.

#####Babel 转义器会把 JSX 转换成一个名为 React.createElement() 的方法调用。
>要在js中直接写xml结构，需要有一个解析器解析
所以有一个库： babel.min.js

	<script type="text/babel"></script>

> **注意单标签必须写结束标签！！**
> 
> **jsx元素必须有一个顶层标签包裹**


#####将元素渲染到 DOM 中
>**参数：**

>1. 要渲染的标签
>
>2. 渲染到的目标容器
>
	<body>
		<div id="box">
			 <!-- <h2>
				<span>hello</span>
			</h2>  -->
			
		</div>
		<script>
			let span = React.createElement('span',{className:'red'},'hello')
			let h2 = React.createElement('h2',null,span)
			ReactDOM.render(
				h2,
				document.getElementById('box')
			)
		</script>
	</body>

#####组件 & Props & 组件定制数据
>	组件名称必须以大写字母开头。

>* **外面传进来的数据会自动放在当前组件的实例对象的props属性上**
* props是一个对象
* 默认值的设置：在单花括号里用 || 即可
	* `{this.props.title||'hello'}`

>如果属性多的话，要在组件标签的行间手动写很多，比较臃肿，所以采用**扩展运算符...**
>
* {...obj1}  会把obj1扩展到this.props这个对象上


	<body>
		<div id="box">
			 
		</div>
		<script type="text/babel">
			let title = '标题';
			let aa1 = '小狗'
			let aa2 = '小猫'
			let arr1 = [1,2,3,4]
			let arr2 = ['a','b','c','d']
			let obj1 = {
				aa : '小狗',
				arr : [1,2,3,4]
			}
			let obj2 = {
				aa : '小猫',
				arr : ['a','b','c','d']
			}
			class List extends React.Component{
				render(){
					return (
						<ul>
							{
								this.props.abc.map((item,index)=>{
									return <li key={index}>{item}</li>
								})
							}
						</ul>
					)
				}
			}
			class Hello extends React.Component{
				render(){
					return (
						<div>
							<h2>{this.props.aa || 'hello'}</h2>
							<List abc={this.props.arr}></List>
						</div>
					)
				}
			}
			ReactDOM.render(
				<div>
					<Hello {...obj1}></Hello>
					<Hello {...obj2}></Hello>
				</div>,
				document.getElementById('box')
			)


		</script>
	</body>
	

#####组件定制样式和结构
>**react里的虚拟标签的行间样式style的写法:**

	 style={{width:'100px',height:'100px'}}
>因为style属性的值本来就是一个对象{ }

	<body>
		<div id="box">
			 
		</div>
		<script type="text/babel">
			
			class Hello extends React.Component{
				render(){
					let style = {width:'100px',height:'50px',background:'pink'};
					let html = <div style={style}>{this.props.hello}</div>
					if(this.props.type === 'text'){
						html = <input type="text" />
					}else if(this.props.type === 'btn'){
						html = <button>按钮</button>
					}
					return html
						
					
				}
			}
			ReactDOM.render(
				<Hello hello={'hehe'} type={'btn'}></Hello>,
				document.getElementById('box')
			)


		</script>
	</body>


#####外面的交互改变组件内的状态

	<body>
		<div id="box">
			 
		</div>
		<script type="text/babel">
			
			class Hello extends React.Component{
				constructor(props){
					super(props)
					this.state = {
						color:'pink',
						val:'hi,girl!'
					}
				}
				changeColor(){
					this.setState({
						color: 'lightblue',
						val:'hello,boy'
					})
				}
				render(){
					let style = {width:'100px',height:'50px',background:this.state.color};
					
					return (
						<div>
							<div style={style} onClick={this.changeColor.bind(this)}>{this.props.hello}</div>
							<ul>
								<li>{this.state.val}</li>
								<li>1111111111111</li>
							</ul>
						</div>
					
					)
						
					
				}
			}
			ReactDOM.render(
				<Hello hello={'hehe'}></Hello>,
				document.getElementById('box')
			)

		</script>
	</body>

	