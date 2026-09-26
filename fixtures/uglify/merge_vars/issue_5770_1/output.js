L: do {
    if (console) {
        var a = "FAIL 1";
        if (a)
            continue L;
    }
    var b = "FAIL 2";
} while (console.log(b || "PASS"));
