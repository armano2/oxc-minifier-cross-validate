try {
    (function({
        [c = 0]: c
    }) {})(1);
} catch (e) {
    console.log("PASS");
}
