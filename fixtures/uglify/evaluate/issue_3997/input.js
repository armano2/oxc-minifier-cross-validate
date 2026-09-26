var a = function f(b) {
    return b[b += this] = b;
}(0);
console.log(typeof a);
