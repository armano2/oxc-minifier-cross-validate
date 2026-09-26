console.log(function(a) {
    try {
        try {
            if (console + (a = "PASS", ""))
                return "FAIL 1";
            a.p;
        } catch (e) {}
    } finally {
        return a;
    }
}("FAIL 2"));
