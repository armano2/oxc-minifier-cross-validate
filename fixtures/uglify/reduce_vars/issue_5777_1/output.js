function f() {
    (function(a) {
        (function() {
            h();
        })();
        a = function() {};
        function h() {
            console.log(a);
        }
    })("PASS");
}
f();
