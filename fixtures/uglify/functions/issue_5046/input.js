var a = 0;
if (a)
    0();
else
    (function f() {
        f;
        return a = "PASS";
    })();
console.log(a);
