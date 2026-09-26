console.log(function() {
    function f(a) {
        var b = a++;
        for (a in "foo");
    }
    f();
    return typeof a;
}());
