(function(a) {
    var b;
    do {
        "FAIL";
        if (Array.isArray(a)) {
            b = a[0];
            console.log(b);
        }
    } while (!console);
})([ "PASS" ]);
