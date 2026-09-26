var a = "FAIL";
function f() {
    function g() {
        function h() {
            a = 42;
            a = "PASS";
            return "PASS";
        }
        var b = h();
        console.log(b);
    }
    g();
}
f();
console.log(a);
