(function() {
    var x = function f() {
        return f;
    };
    console.log(x() === arguments[0]);
})();
