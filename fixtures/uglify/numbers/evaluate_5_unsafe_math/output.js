function f(num) {
    var a = "" + num;
    [
        +a + 5,
        +a + -1,
        a - -1,
        a - 5,
        +a + 5,
        +a + -1,
        5 - a,
        -1 - a,
        +a + 5,
        5 - a,
        +a - 1,
        -1 - a,
    ].forEach(function(n) {
        console.log(typeof n, n);
    });
}
f(1);
