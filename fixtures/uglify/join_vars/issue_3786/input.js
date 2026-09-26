try {
    var a = b;
    b = 0;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
