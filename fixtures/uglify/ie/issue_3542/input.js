var a = 0;
var b = a++;
var c = b && function a() {} || b;
console.log(a);
