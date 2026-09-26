try {
    (function({
        p: {
            [(a, 0)]: a,
        },
    }) {})({
        p: 1,
    });
} catch (e) {
    console.log("PASS");
}
