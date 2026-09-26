function f(a) {
    var b;
    new class {
        [b = console.log(a)] = b;
    }(a.p);
}
f("PASS");
