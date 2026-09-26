try {
    (function() {
        arguments = null;
        console.log(arguments.p = "FAIL");
    })();
} catch (e) {
    console.log("PASS");
}
