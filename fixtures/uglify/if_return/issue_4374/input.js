(function() {
    console.log(f(console));
    function f(a) {
        if (console) return 0;
        if (a) return 1;
        return 0;
    }
})();
