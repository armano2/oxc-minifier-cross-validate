(function() {
    do {
        try {
            return;
        } finally {
            continue;
        }
        console.log("FAIL");
    } while (0);
    console.log("PASS");
})();
