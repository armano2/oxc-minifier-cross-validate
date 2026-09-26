try {
    c;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
try {} catch (c) {
    var a;
    c = 0;
}
