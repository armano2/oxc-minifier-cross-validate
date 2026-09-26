function f(num, y) {
    var x = "" + num;
    [
        +x + 2 + (3 + !y),
        +x + 2 + (3 - !y),
        +x + 2 - (3 + !y),
        +x + 2 - (3 - !y),
        x - 2 + (3 + !y),
        x - 2 + (3 - !y),
        x - 2 - (3 + !y),
        x - 2 - (3 - !y),
    ].forEach(function(n) {
        console.log(typeof n, n);
    });
}
f(42);
