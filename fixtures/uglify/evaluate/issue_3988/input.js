function f(b) {
    return ("" + (b &= 0))[b && this];
}
var a = f();
console.log(a);
