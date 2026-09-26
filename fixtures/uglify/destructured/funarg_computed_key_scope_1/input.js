var b = 0;
function f({
    [b]: a
}) {
    var b = 42;
    console.log(a, b);
}
f([ "PASS" ]);
