(function(a) {
    (function() {
        (function() {
            h();
        })();
        a = function() {};
        function h() {
            console.log(a);
        }
    })();
})("PASS");
