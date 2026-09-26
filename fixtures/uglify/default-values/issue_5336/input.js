var a;
do {
    (function f(b = console.log("PASS")) {
        a = f;
    })(42);
} while (a());
