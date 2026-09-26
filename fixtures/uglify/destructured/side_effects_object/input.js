var a = null, b = console, { c } = 42;
try {
    c[a = "PASS"];
} catch (e) {
    console.log(a);
}
