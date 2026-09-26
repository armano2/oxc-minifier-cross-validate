function f() {
    console.log(a);
}
this;
var a = 1;
f(console.log(2), f(), a = 3);
