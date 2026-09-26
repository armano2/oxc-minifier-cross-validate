try {
    (function({
        [a]: b,
    }, a) {
        console.log("FAIL");
    })({});
} catch (e) {
    console.log("PASS");
}
