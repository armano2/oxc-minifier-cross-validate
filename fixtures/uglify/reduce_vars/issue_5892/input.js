try {
    var a = 42;
    a.p;
    if (console)
        a = null;
    a.q;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
