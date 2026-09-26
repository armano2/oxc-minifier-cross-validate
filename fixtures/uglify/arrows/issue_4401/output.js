(function() {
    var a = (b => b(a))(console.log || a);
    var c = console.log;
    c && c(typeof b);
})();
