var a, b = 1;
(function f() {
    a = "foo";
    b-- && f();
    console.log(a);
    a = "bar";
})();
