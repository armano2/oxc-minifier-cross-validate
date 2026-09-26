var a = "FAIL 1";
function f(b, c) {
    function g() {
        if (console)
            return 42;
        else
            c = "FAIL 2";
    }
    var d = g();
    console.log(c || "PASS");
    var e = function h() {
        while (b && e);
    }();
}
f(a++) && a;
