try {
    (function f({
        [a = 1]: a,
    }) {})(2);
} catch (e) {
    console.log("PASS");
}
