console.log(function() {
    var a = function() {
        a += null;
        a -= 42;
    };
}());
