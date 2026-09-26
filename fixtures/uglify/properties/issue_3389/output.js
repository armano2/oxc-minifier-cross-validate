(function() {
    var a = "PASS";
    if (delete b)
        b = a.null = 42;
    console.log(a);
})();
