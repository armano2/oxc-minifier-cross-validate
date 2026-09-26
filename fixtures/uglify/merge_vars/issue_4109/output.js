var a = "foo";
try {
    throw "bar";
} catch (e) {
    console.log(e);
} finally {
    var o = a;
    for (var k in o);
    (function() {
        a++;
    });
}
console.log(a);
