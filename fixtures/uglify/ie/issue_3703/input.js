var a = "PASS";
function f() {
    var b;
    function g() {
        a = "FAIL";
    }
    var c = g;
    function h() {
        f;
    }
    a ? b |= c : b.p;
}
f();
console.log(a);
