#Vue学习

##1.VUE 内部指令
###1.1v-if 和v-show的区别：
	v-if： 判断是否加载，可以减轻服务器的压力，在需要时加载。
	v-show：调整css dispaly属性，可以使客户端操作更加流畅。
###1.2v-bind（：）
	1、直接绑定class样式
      <div :class="className">1、绑定classA</div>
    2、绑定classA并进行判断，在isOK为true时显示样式，在isOk为false时不显示样式。
      <div :class="{classA:isOk}">2、绑定class中的判断</div>
    3、绑定class中的数组
      <div :class="[classA,classB]">3、绑定class中的数组</div>
    4、绑定class中使用三元表达式判断
      <div :class="isOk?classA:classB">4、绑定class中的三元表达式判断</div>
    5、绑定style
      <div :style="{color:red,fontSize:font}">5、绑定style</div>
    6、用对象绑定style样式
      <div :style="styleObject">6、用对象绑定style样式</div>
###1.3v-pre & v-cloak & v-once
>v-pre指令
>
    在模板中跳过vue的编译，直接输出原始值。就是在标签中加入v-pre就不会输出vue中的data值了。
>v-cloak指令
>
    在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用
>v-once指令
>
    在第一次DOM时进行渲染，渲染完成后视为静态内容，跳出以后的渲染过程。

##2.VUE 全局API
###2.1vue.directive 自定义指令
####自定义指令有五个生命周期（也叫钩子函数），分别是 **bind,inserted,update,componentUpdated,unbind**

*      **bind:**只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
*      **inserted:**被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
*      **update:**被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
*      **componentUpdated:**被绑定元素所在模板完成一次更新周期时调用。
*      **unbind:**只调用一次，指令与元素解绑时调用。

####自定义指令中传递的三个参数
*	el: 指令所绑定的元素，可以用来直接操作DOM。

*	binding:  一个对象，包含指令的很多信息。

*	vnode: Vue编译生成的虚拟节点。

>**HTML代码**

	<div id="app">
      <div v-hello="color">{{num}}</div>
      <p><button @click="add()">ADD</button></p>
    </div>
    <p><button onclick="unbind()">解绑</button></p>

>**JS代码**

	  解绑
	  function unbind(){
        app.$destroy();
      }


      Vue.directive('hello',{
        bind:function(el,binding){//被绑定
          console.log('1 - bind');
          el.style= 'color:'+ binding.value;
        },
        inserted:function(){//绑定到节点
          console.log('2 - inserted');
        },
        update:function(){//组件更新
          console.log('3 - update');
        },
        componentUpdated:function(){//组件更新完成
          console.log('4 - componentUpdated');
        },
        unbind:function(){//解绑
          console.log('5 - unbind');
        }
      })
      var app = new Vue({
        el:'#app',
        data:{
          num: 10,
          color: 'pink'
        },
        methods:{
          add(){
            this.num++
          }
        }
      });

###2.2vue.extend 构造器的延伸
####Vue.extend 返回的是一个“扩展实例构造器”,也就是预设了部分选项的Vue实例构造器。经常服务于Vue.component用来生成组件，可以简单理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用“扩展实例构造器”来生产组件实例，并挂载到自定义元素上。

**HTML代码**

	<div id="hello"></div>
    <hello></hello>

**JS代码**

>	编写一个扩展实例构造器

	  let helloExtend = Vue.extend({
        template: "<p><a :href='hrefUrl' target='_blank'>{{helloName}}</a></p>",
        data(){
          return{
            helloName:'hello world',
            hrefUrl:'http://baidu.com'
          }
        }
      })

>	这时html中的标签还是不起作用的，因为扩展实例构造器是需要挂载的，我们再进行一次挂载。

      new helloExtend().$mount('#hello')
      new helloExtend().$mount('hello')

###2.3Vue.set全局操作
####Vue.set 的作用就是在构造器外部操作构造器内部的数据、属性或者方法。
**为什么要有Vue.set的存在?**

      由于Javascript的限制，Vue不能自动检测以下变动的数组。

      当你利用索引直接设置一个项时，vue不会为我们自动更新。

      当你修改数组的长度时，vue不会为我们自动更新。

      所以我们需要用Vue.setVue.set(this.arr,1,'hi')来设置改变，vue才会给我们自动更新，这就是Vue.set存在的意义。

>**HTML代码**

	<div id="app">
      {{count}}
      <p><button @click="add()">add</button></p>
      <ul>
        <li v-for="item in arr">{{item}}</li>
      </ul>
    </div>

>**JS代码**	

	var outData = {
        count:1,
        arr:[111,222,3333]
      }
      var app = new Vue({
        el:'#app',
        data:outData,
        methods:{
          add(){
            //this.count++
            this.arr[1] = 'hello' //有上面一条可以改变数组，没有则不能改变，需要用Vue.set()改变
            Vue.set(this.arr,1,'hi')
          }
        }
      })

###2.4Vue的生命周期（钩子函数）
####Vue一共有10个生命周期函数，我们可以利用这些函数在vue的每个阶段都进行操作数据或者改变内容。

		beforeCreate:function(){
          console.log('1-beforeCreate 初始化之前');
        },
        created:function(){
          console.log('2-created 创建完成');
        },
        beforeMount:function(){
          console.log('3-beforeMount 挂载之前');
        },
        mounted:function(){
          console.log('4-mounted 挂载之后');
        },
        beforeUpdate:function(){
          console.log('5-beforeUpdate 数据更新前');
        },
        updated:function(){
          console.log('6-updated 被更新后');
        },
        activated:function(){
          console.log('7-activated');
        },
        deactivated:function(){
          console.log('8-deactivated');
        },
        beforeDestroy:function(){
          console.log('9-beforeDestroy 销毁之前');
        },
        destroyed:function(){
          console.log('10-destroyed 销毁之后')
        }

###2.5Template 制作模版
####直接写在选项里的模板
>直接在构造器里的template选项后边编写。这种写法比较直观，但是如果模板html代码太多，不建议这么写。

	var app=new Vue({
	     el:'#app',
	     data:{
	         message:'hello Vue!'
	      },
	     template:`
	        <h1 style="color:red">我是选项模板</h1>
	     `
	})

####写在<template>标签里的模板

	<template id="demo2">
             <h2 style="color:red">我是template标签模板</h2>
    </template>
 
    <script type="text/javascript">
        var app=new Vue({
            el:'#app',
            data:{
                message:'hello Vue!'
            },
            template:'#demo2'
        })
    </script>

####写在script标签里的模板

	<script type="x-template" id="demo3">
        <h2 style="color:red">我是script标签模板</h2>
    </script>
 
    <script type="text/javascript">
        var app=new Vue({
            el:'#app',
            data:{
                message:'hello Vue!'
            },
            template:'#demo3'
        })
    </script>

###2.6Component 初识组件
####全局化注册组件
>**HTML代码**	

	<div id="app">
      	<hello><hello>
    </div>

>**JS代码**	

	Vue.component('hello',{
	    template:`<h2 style="color:pink;">hello world!(我是全局组件)</h2>`
	})

####局部注册组件
局部注册组件和全局注册组件是向对应的，局部注册的组件只能在组件注册的作用域里进行使用，其他作用域使用无效。
>**HTML代码**

	<div id="app">
      	<hello><hello>
    </div>

>**JS代码**
	
	var app = new Vue({
        el:'#app',
        components:{
          "hi":{
            template:`<h2 style="color:yellow;">hi,~~!(我是局部组件)</h2>`
          }
        }
    })

###2.7Component 组件props 属性设置
>**HTML代码**

	<div id="app">
      <aaa from="my home"></aaa>
    </div>

>**JS代码**

	var app = new Vue({
        el:'#app',
        components:{       
          "aaa":{
            template:`<h2 style="color:lightcoral;">welcome to {{from}}</h2>`,
            props:['from']
          }

        }
     })

###2.8Component 父子组件关系
>**HTML代码**

	<div id="app">
      <aa></aa>
    </div>

>**JS代码**

	  var bb = {
        template:`<div>我是~~~~~</div>`
      }
      var aa = {
        template:`
          <div>
            <p>hello world!~~</p>  
            <bb></bb>
          </div>
        `,
        components:{
          'bb':bb
        }
      }
      var app = new Vue({
        el:'#app',
        components:{         
          'aa':aa
        }
      })

###2.9Component 标签
*	< component >< /component >标签是Vue框架自定义的标签，它的用途就是可以动态绑定我们的组件，根据数据的不同更换不同的组件。

>**HTML代码**

	<div id="app">
      <component :is="who"></component>
      <button @click="changeComponent">changeComponent</button>
    </div>

>**JS代码**

	  var componentA={
          template:`<div style="color:red;">I'm componentA</div>`
      }
      var componentB={
          template:`<div style="color:yellow;">I'm componentB</div>`
      }
      var componentC={
          template:`<div style="color:pink;">I'm componentC</div>`
      }
      var app = new Vue({
        el:'#app',
        data:{
          who:'componentA'
        },
        components:{         
          "componentA":componentA,
          "componentB":componentB,
          "componentC":componentC,
        },
        methods:{
          changeComponent(){
            if(this.who=='componentA'){
                this.who='componentB';
            }else if(this.who=='componentB'){
                this.who='componentC';
            }else{
                this.who='componentA';
            }
          }
        }
      })
