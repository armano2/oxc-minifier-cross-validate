var a = 42;
(function f(b) {
    var b = a;
    if (b === arguments[0])
        console.log("PASS");
})(console);
