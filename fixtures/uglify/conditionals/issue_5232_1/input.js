(function() {
    if (Math) {
        function f() {}
        for (var a in [ 42 ])
            console.log(typeof f);
    } else {
        var b = null;
        return true;
    }
})();
