A = "foo";
var a = A;
var [ b = c = "bar" ] = [ console, console.log(a) ];
console.log(c);
var c;
