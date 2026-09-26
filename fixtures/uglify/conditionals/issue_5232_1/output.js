(function() {
    var b;
    if (!Math)
        return b = null, true;
    function f() {}
    for (var a in [ 42 ]) console.log(typeof f);
})();
