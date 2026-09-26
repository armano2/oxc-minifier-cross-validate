function f(a) {
    if (a)
        if (a)
            console.log("PASS");
        else
            console.log("FAIL");
}
f(null);
f(42);
