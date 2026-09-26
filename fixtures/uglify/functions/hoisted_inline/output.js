function f() {
    console.log("PASS");
}
(function() {
    for (var console in [ 0 ])
        void f();
})();
