try {
    console.log(([ {} ] = [], function() {
        while (!console);
    }()));
} catch (e) {
    console.log("PASS");
}
