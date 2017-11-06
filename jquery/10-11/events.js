class Events {
	constructor(){
		// 记录留下来的电话号（函数）
		this._event = {};
	}

	on(type,listener){

		// 必须是函数

		if( typeof listener !== 'function' ){
			throw new TypeError('"listener" must be a function');
		}

		// 这个type是否已经记录在电话号码本上了，记录了追加新的电话号码 没记录先创建一个数组
		let events = this._event[type];

		if( !events ){
			this._event[type] = [];
		}



		this._event[type].push(listener); // 把电话号码存起来
	}

	emit(type,...args){

		let events = this._event[type];

		// 通知对应关心多少平的订阅者
		if(events && Array.isArray(events)){
			events.forEach((item) => {
				item.apply(this,args);
			})
		}
	}

	off(type,listener){
		let events = this._event[type];

		if(events && Array.isArray(events)){
			let len = events.length;
			for( var i = 0; i < len; i++ ){
				if(events[i] === listener){
					events.splice(i,1);
					break;
				}
			}
		}
		
	}
}