var a = function f(b) {
    b = "FAIL";
    arguments[0] = "PASS";
    var arguments = 0;
    console.log(b);
}(a);
