var items = document.querySelectorAll('#item');
var inputs = document.querySelectorAll('input');
var input1 = document.querySelector('.box_b input');
var quanxuan = document.getElementById('quanxuan');
var prevIndex = 0;
var m = 0;
var n = 0; // 只要选中一个checkbox为true，就让n+1
var isClick = 0; //没点击；
var onOff =true;
for(var i=0;i<items.length;i++){
	if(i%2 == 0){
		
	}else{
		items[i].className = 'bg1';
	}
	
	items[i].index = i;
	items[i].isClick = 0; //没点击；
	items[i].onmouseover = function(){
		this.className = 'bg2';
	}
	
	items[i].onmouseout = function(){	 
		if(this.isClick == 0){//没点击
			if(this.index%2 == 0){
				this.className = '';
				
			}else{
				this.className = 'bg1';
			}
		}else{
			this.className = 'bg2';
		}
	}
	
	items[i].onclick = function(){
		if(this.isClick == 1){
			if(this.index%2 == 0){
				this.className = '';
			}else{
				this.className = 'bg1';
			}
			this.isClick = 0;
			inputs[this.index].checked = false;
			n--;
		}
		else{
			n++;
			this.className = 'bg2';
			inputs[this.index].checked = true;
			this.isClick = 1;
		}
		if(n >= items.length){
			input1.checked = true;
			onOff = false;
		}else{
			input1.checked = false;
			onOff = true;
		}
	}
	quanxuan.onclick = function(){
		if(onOff){
			input1.checked = true;
			for(var j=0;j<items.length;j++){
				items[j].className = 'bg2';
				items[j].isClick = 1;
				inputs[j].checked = true;
			}
			onOff = false;
			n = items.length;
		}else{
			input1.checked = false;
			for(var j=0;j<items.length;j++){
				if(j%2 == 0){
					items[j].className = '';
					
				}else{
					items[j].className = 'bg1';
				}
				items[j].isClick = 0;
				inputs[j].checked = false;
			}
			onOff = true;
			n = 0;
		}
		
	}
}



