function f(a) {
    return console.log(a++), a && this;
}
var b = f();
console.log(b);
