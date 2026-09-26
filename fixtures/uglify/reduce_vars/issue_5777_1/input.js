function f() {
    (function(a) {
        function g() {
            h();
        }
        g();
        a = function() {};
        function h() {
            console.log(a);
        }
    })("PASS");
}
f();
