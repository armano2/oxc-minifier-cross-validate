var a = "10", b = 1;
function f(c, d) {
    return d;
}
f((b += a, b *= a), f);
console.log(b);
