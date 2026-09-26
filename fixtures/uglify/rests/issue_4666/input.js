var a = 0, b = 0;
var o = ((...c) => a++ + c)(b);
for (var k in o)
    b++;
console.log(a, b);
