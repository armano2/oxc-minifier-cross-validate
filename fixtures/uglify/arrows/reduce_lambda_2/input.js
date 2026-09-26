(function(f, a, b) {
    f = () => {
        console.log(a, b);
    };
    a = "foo", b = 42;
    f();
    b = "bar";
    f();
})();
