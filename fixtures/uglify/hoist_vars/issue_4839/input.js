var log = console.log, o = function(a, b) {
    return b && b;
}("foo");
for (var k in o)
    throw "FAIL";
log("PASS");
