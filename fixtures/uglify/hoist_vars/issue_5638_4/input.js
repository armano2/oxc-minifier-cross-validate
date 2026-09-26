var log = console.log;
var o = { foo: 6 };
for (var k in o) {
    var v = o[k];
    log(k || v, v *= 7);
}
