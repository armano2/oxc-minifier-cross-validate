function f() {
    this.a = "FAIL";
}
var b = f();
var a = "PASS";
var b;
var c = b;
console.log(a);
