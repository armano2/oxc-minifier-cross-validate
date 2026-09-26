var a = "FAIL";
d = a;
var c = void (d && (a = "PASS"));
var d;
console.log(a, typeof c);
