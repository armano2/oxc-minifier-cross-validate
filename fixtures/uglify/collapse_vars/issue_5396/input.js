var a, b;
function f() {}
b = 0;
new function g(c) {
    var d = a && g(e), e = ++d, i = [ 42 ];
    for (var j in i)
        console.log("PASS"),
        i;
}();
