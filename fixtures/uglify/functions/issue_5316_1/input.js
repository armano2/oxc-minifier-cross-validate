do {
    console.log("PASS");
} while (function() {
    var a, b = 42 && (console[a = b] = a++);
}());
