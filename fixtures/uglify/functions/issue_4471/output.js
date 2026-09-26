f(g());
function f() {
    return g();
}
function g() {
    console.log("PASS");
}
