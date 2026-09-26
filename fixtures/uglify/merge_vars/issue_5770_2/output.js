L: do {
    var a = "FAIL 1";
    var b;
} while (a || (b = "FAIL 2"), console.log(b || "PASS"));
