function f(a, {
    [a]: b
}) {
    console.log(b);
}
f(0, [ "PASS" ]);
