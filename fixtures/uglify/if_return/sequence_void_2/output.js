function f() {
    if (console)
        console, void console.log("PASS");
    else {
        return;
        FAIL;
    }
}
f();
