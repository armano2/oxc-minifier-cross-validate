function f0() {
    var a = {};
    return a === a;
}
function f1() {
    var a = [];
    return a === a;
}
console.log(f0(), f1());
