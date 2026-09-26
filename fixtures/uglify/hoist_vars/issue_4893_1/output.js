try{
    (function() {
        null.p += 42;
    })();
} catch (e) {
    console.log("PASS");
}
