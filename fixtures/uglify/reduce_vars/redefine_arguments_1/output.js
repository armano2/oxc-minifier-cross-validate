function f() {
    var arguments;
    return typeof arguments;
}
function g() {
    return "number";
}
function h(x) {
    var arguments = x;
    return typeof arguments;
}
console.log(f(), g(), h());
