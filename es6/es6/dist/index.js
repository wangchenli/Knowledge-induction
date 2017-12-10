'use strict';

var a = 1;
// console.log(a)

var arr = [1, 3, 54, 667, 4, 43];

/*for(var i=0;i<arr.length;i++){
  console.log(arr[i])
}*/

/*
//for…of的循环可以避免我们开拓内存空间，增加代码运行效率，
for(var item of arr){
  console.log(item)
}*/

/*let json = {
  '0':'dada',
  '1':'dsa',
  '2':'dasfasdvada',
  length:3
}
let arr1 = Array.from(json)
console.log(arr1)*/

var arr2 = ['哈哈', '呵呵呵', 'lalala'];
arr2.fill('hehehe', 1, 2);
console.log(arr2);
