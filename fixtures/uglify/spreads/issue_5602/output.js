(function() {
    try {
        var b = void (A = 0);
    } catch (e) {
        b();
    }
})(),
console.log(A);
