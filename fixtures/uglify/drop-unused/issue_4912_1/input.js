var a = A = function() {};
A;
a.prototype = {
    f: function() {
        console.log("PASS");
    },
};
new A().f();
