var a = f();
f();
function f() {
    if (console.log("foo"))
        console && f();
}
