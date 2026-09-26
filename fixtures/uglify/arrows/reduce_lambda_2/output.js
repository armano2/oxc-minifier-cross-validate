(function(f, a, b) {
    f = () => {
        console.log("foo", b);
    };
    b = 42;
    f();
    b = "bar";
    f();
})();
