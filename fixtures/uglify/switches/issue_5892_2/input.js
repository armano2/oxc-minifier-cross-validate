try {
    switch (42) {
      case null:
        var a = "foo";
      default:
        a.p;
    }
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
