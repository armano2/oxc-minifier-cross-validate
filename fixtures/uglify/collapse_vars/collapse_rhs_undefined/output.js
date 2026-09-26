var a, b;
function f() {
    b = a = void 0;
    return;
}
var c = f();
console.log(a === b, b === c, c === a);
