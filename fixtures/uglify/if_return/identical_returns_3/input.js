function f(a) {
    if (a)
        return 42;
    if (a)
        return;
    return 42;
}
if (f(console))
    console.log("PASS");
