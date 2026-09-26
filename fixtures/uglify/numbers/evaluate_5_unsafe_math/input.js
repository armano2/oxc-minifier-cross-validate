function f(num) {
    var a = "" + num;
    [
        +a + 2 + 3,
        +a + 2 - 3,
        +a - 2 + 3,
        +a - 2 - 3,
        2 + +a + 3,
        2 + +a - 3,
        2 - +a + 3,
        2 - +a - 3,
        2 + 3 + +a,
        2 + 3 - +a,
        2 - 3 + +a,
        2 - 3 - +a,
    ].forEach(function(n) {
        console.log(typeof n, n);
    });
}
f(1);
