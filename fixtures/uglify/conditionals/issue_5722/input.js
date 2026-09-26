var a = true;
a && function f() {
    return 42;
}(a++) ? null + (console.log("PASS") && a++) : "";
