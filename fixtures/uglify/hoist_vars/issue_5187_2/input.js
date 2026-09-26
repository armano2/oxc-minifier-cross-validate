function f() {
    var a = 42;
    do {
        var b = { 0: a++ };
    } while (console.log(b[b ^= 0]));
}
f();
