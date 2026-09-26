(function() {
    L: do {
        do {
            try {
                return;
            } finally {
                continue L;
            }
        } while (console.log("FAIL"), 0);
        console.log("FAIL");
    } while (0);
    console.log("PASS");
})();
