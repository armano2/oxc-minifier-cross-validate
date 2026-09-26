var a = 42;
(function f(b) {
    b = a;
    if (b === arguments[0])
        console.log("PASS");
})(console);
