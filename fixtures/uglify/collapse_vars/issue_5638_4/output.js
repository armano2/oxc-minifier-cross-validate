var log = console.log;
var a = { foo: 6 }, b;
for (var k in a) {
    b = a[k];
    log(k || b, b *= 7);
}
