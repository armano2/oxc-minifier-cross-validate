(function(a) {
    function f() {}
    a = console;
    f();
    a.log(typeof f);
})();
