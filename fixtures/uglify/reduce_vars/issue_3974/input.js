try {
    var a = 0 in 0;
    0 && a;
} catch (e) {
    console.log("PASS");
}
