var log = console.log;
var a = { foo: 42 }, b;
for (var k in a) {
    b = a[k];
    log(k || b, b++);
}
