var a, b;
function f() {
    return b = a = !0;
}
var c = f();
console.log(a === b, b === c, c === a);
