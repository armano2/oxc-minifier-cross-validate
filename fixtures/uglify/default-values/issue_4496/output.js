(function f(a = 0) {
    console.log(function(b) {
        a && b();
        return a;
    }(f));
})(42);
