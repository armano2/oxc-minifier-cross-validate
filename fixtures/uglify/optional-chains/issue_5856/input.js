try {
    var a;
    a?.p;
    a.q;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
