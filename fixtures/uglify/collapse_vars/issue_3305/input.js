function calc(a) {
    var x, w;
    if (a) {
        x = a;
        w = 1;
    } else {
        x = 1;
        w = 0;
    }
    return add(x, w);
}
function add(x, w) {
    return x + w;
}
console.log(calc(41));
