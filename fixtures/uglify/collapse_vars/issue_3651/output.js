var a, b = "PASS";
try {
    a = function() {
        try {
            var c = 1;
            while (0 < --c);
        } catch (e) {} finally {
            throw 42;
        }
    }();
    b = "FAIL";
    a.p;
} catch (e) {
    console.log(b);
}
