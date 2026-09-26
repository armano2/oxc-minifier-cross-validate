var a = 0;
try {
    const b = function() {
        a = 1;
        b[1];
    }();
} catch (e) {
    console.log(a);
}
