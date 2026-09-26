var A = function() {
    function B() {}
    B.prototype.m = function() {
        console.log("PASS");
    };
    return B;
}();
new A().m();
