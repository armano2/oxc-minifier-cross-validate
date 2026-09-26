function f() {
    var a;
    do {
        var b = { p: a };
    } while (console.log(b += ""));
}
f();
