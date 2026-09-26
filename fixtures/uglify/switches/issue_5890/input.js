var a = {};
a.p;
try {
    switch (42) {
      default:
        a = null;
      case false:
        a.q;
    }
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
