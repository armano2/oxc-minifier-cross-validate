(function() {
    var a = 1;
    var b = (a = NaN) || (console.log("PASS"), 2);
    return a;
})();
