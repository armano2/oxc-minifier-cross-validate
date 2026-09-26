var log = console.log;
var o = { foo: 42 };
for (var k in o) {
    var v = o[k];
    log(k || v, v++);
}
