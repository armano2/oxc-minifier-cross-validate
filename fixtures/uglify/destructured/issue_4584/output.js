try {
    (function f({
        [console.log(a = "FAIL")]: a,
    }) {})(0);
} catch (e) {
    console.log("PASS");
}
