var A = (B.prototype.m = function() {
    console.log("PASS");
}, B);
function B() {}
new A().m();
