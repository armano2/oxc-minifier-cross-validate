function f() {
    (function NaN() {
        var a = 1;
        while (a--)
            try {} finally {
                console.log(0/0);
                var b;
            }
    })(f);
}
f();
NaN;
