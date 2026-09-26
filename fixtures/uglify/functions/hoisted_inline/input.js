function f() {
    console.log("PASS");
}
function g() {
    for (var console in [ 0 ])
        h();
}
function h() {
    f();
}
g();
