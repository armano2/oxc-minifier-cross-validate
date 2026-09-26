function f() {
    return a;
}
var a;
console.log((a = 42, void f()[42]));
