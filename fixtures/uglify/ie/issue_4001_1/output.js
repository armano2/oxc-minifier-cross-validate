function f() {
    return a;
}
var a;
console.log((a = 42, f()[42], void f, void function a() {}));
