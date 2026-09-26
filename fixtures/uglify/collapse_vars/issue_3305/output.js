function calc(a) {
    var x, w;
    return w = a ? (x = a, 1) : (x = 1, 0), add(x, w);
}
function add(x, w) {
    return x + w;
}
console.log(calc(41));
