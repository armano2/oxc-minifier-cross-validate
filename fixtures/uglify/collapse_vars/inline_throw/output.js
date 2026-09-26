try {
    (function(a) {
        throw a;
        return;
    })("PASS");
} catch (e) {
    console.log(e);
}
