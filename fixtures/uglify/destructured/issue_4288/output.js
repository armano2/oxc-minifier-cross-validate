function f({
    [new function() {
        console.log(typeof b);
    }()]: a,
}) {
    var a = a;
    a++;
}
f(0);
