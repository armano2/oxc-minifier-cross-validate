var c = "FAIL";
(function(a) {
    var b;
    (b = a) && ({
        set foo(v) {
            a = v;
        }
    }.foo = 0);
    b && (c = "PASS");
})(42);
console.log(c);
