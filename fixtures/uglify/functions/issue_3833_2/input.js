function f(a) {
    return function() {
        while (a);
        console.log("PASS");
    }();
}
f();
