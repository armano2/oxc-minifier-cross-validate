var a = 0;
console.log(function(b) {
    try {
        try {
            if (a + (b = "PASS", true)) return;
            b.p;
        } finally {
            return b;
        }
    } catch (e) {
    }
}());
