f(f());
function f() {
    return g();
}
function g() {
    {
        console.log("PASS");
    }
}
