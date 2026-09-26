console.log(function() {
    return function f(...[ a ]) {
        return a;
    }("PASS");
}());
