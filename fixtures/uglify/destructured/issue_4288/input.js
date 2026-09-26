function f({
    [new function() {
        console.log(typeof b);
    }()]: a,
}) {
    var b = a;
    b++;
}
f(0);
