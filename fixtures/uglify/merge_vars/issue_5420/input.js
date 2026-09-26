do {
    var a = "FAIL 1";
    a && a.p;
    a = "FAIL 2";
    try {
        continue;
    } catch (e) {}
    var b = "FAIL 3";
} while (console.log(b || "PASS"));
