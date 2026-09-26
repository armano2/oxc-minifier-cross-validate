L: for (var a in function() {
    while (console.log("PASS"));
}(), a) do {
    continue L;
} while (console.log("FAIL"));
