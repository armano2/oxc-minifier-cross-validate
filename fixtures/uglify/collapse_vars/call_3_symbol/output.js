(function(a) {
    function f() {
        a = {
            log: function() {
                console.log(typeof f);
            }
        }
    }
    a = console;
    f();
    a.log("FAIL");
})();
