var f, a = 1;
(f = function() {
    console.log(a ? "foo" : "bar");
})();
f(a = 0);
