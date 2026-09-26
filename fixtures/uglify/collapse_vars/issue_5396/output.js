var a, b;
function f() {}
b = 0;
(function g(c) {
    a && g();
    for (var j in [ 42 ])
        console.log("PASS");
})();
