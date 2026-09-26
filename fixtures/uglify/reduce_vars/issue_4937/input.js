function f() {
    while (console.log("PASS"));
}
do {
    function g() {
        f();
    }
} while (!g);
f();
