var a = 1, b;
function f(c, d) {
    c || console.log(d);
}
f(a++ + (b = b), b |= console.log(a));
