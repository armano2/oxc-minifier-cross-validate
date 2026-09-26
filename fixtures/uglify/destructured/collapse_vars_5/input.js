var a;
try {
    [] = (a = 42, null);
    a = 42;
} catch (e) {
    console.log(a);
}
