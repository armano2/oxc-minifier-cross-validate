try {
    var a = null;
    var b = a &&= 42;
    b.p;
} catch (e) {
    console.log("PASS");
}
