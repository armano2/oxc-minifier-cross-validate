var a;
try {
    var [] = (a = 42, null);
    a = 42;
} catch (e) {
    console.log(a);
}
