try {
    (async function(a) {
        return a;
    })(A);
} catch (e) {
    console.log("PASS");
}
