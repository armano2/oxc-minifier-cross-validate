function f() {
    {
        if (console)
            return console, void console.log("PASS");
        return;
    }
    FAIL;
}
f();
