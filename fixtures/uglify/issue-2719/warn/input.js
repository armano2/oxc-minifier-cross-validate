function f() {
    return g();
}
function g() {
    return g["call" + "er"].arguments;
}
// 3
console.log(f(1, 2, 3).length);
