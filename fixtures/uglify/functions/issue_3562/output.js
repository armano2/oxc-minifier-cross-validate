var a = "PASS";
function f(b) {
    f = function() {
        console.log(b);
    };
    return "FAIL";
}
a = f(a);
f(a);
