function f(num, y) {
    var x = "" + num;
    [
        +x + 5 + !y,
        +x + 5 - !y,
        +x + -1 - !y,
        +x + -1 + !y,
        x - -1 + !y,
        x - -1 - !y,
        x - 5 - !y,
        x - 5 + !y,
    ].forEach(function(n) {
        console.log(typeof n, n);
    });
}
f(42);
