L: do {
    for (var a = "FAIL 1"; a; a--)
        continue L;
    var b = "FAIL 2";
} while (console.log(b || "PASS"));
