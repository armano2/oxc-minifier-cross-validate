var a, b, f = function() {
    console.log(a);
};
f();
a = "PASS";
b = "FAIL";
f();
if (console.log(typeof b))
    console.log(b);
