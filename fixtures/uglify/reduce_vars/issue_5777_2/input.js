function f(a) {
    (function() {
        function g() {
            h();
        }
        g();
        a = function() {};
        function h() {
            console.log(a);
        }
    })();
}
f("PASS");
