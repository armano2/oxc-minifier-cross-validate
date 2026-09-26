function f1(y) {
    // The constant do-while condition `c` will not be replaced.
    var c = 9;
    do {} while (c === 77);
}
function f2(y) {
    // The non-constant do-while condition `c` will not be replaced.
    var c = 5 - y;
    do { } while (c);
}
function f3(y) {
    // The constant `x` will be replaced in the do loop body.
    function fn(n) { console.log(n); }
    var a = 2, x = 7;
    do {
        fn(a = x);
        break;
    } while (y);
}
function f4(y) {
    // The non-constant `a` will not be replaced in the do loop body.
    var a = y / 4;
    do {
        return a;
    } while (y);
}
function f5(y) {
    function p(x) { console.log(x); }
    do {
        // The non-constant `a` will be replaced in p(a)
        // because it is declared in same block.
        var a = y - 3;
        p(a);
    } while (--y);
}
