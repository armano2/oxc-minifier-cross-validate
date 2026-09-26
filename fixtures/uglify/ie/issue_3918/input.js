if (console.log("PASS")) {
    var a = function f() {
        f.p;
        try {
            console.log("FAIL");
        } catch (e) {}
    }, b = a;
}
