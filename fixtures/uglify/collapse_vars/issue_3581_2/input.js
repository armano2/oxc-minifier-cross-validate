(function() {
    var a = "PASS", b = "FAIL";
    try {
        b = "PASS";
        if (a) return;
        b = 1 + b;
        a = "FAIL";
    } finally {
        console.log(a, b);
    }
})();
