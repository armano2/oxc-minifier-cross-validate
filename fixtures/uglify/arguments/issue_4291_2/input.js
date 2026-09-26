var a = function() {
    if (arguments[0])
        arguments[1] = "PASS";
    return arguments;
}(42);
console.log(a[1], a[0], a.length);
