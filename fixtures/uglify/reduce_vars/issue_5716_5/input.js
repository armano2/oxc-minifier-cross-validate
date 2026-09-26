console.log(function() {
    return 0 || (a = 42 | a);
    var a = function() {
        return a;
    };
}());
