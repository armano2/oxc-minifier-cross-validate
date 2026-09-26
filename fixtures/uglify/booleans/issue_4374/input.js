(function() {
    console.log(f());
    function f(a) {
        if (null) return 0;
        if (a) return 1;
        return 0;
    }
})();
