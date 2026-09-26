function f2() {
    var a = {a:1, b:2};
    var b = a;
    var c = a;
    return b === c;
}
function f3() {
    var a = [1, 2, 3];
    var b = a;
    var c = a;
    return b === c;
}
console.log(f2(), f3());
