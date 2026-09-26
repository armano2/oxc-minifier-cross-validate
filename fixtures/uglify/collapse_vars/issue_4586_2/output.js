var a = 42;
(function f(b) {
    if ((b = a) === arguments[0])
        console.log("PASS");
})(console);
