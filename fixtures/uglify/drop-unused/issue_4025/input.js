var a = 0, b = 0, c = 0, d = a++;
try {
    var e = console.log(c), f = b;
} finally {
    var d = b = 1, d = c + 1;
    c = 0;
}
console.log(a, b, d);
