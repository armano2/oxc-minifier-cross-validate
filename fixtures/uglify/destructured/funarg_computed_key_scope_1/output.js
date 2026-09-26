var b = 0;
function f({
    [b]: a
}) {
    var c = 42;
    console.log(a, c);
}
f([ "PASS" ]);
