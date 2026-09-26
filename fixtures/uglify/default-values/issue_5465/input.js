function f(a, b) {
    (function(c = b = "FAIL 2") {
        this && console.log(b || "PASS");
    })(42 - a && a);
}
f("FAIL 1");
