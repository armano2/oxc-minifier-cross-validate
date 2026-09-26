try {
    throw 42;
} catch (e) {
    function g() {
        // `ReferenceError: e is not defined` on Node.js v4-
        while (void e.p);
    }
    while (console.log(g()));
}
