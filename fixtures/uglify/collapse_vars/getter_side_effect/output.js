var c = "FAIL";
(function(a) {
    var b;
    (b = a) && {
        get foo() {
            a = 0;
        }
    }.foo;
    b && (c = "PASS");
})(42);
console.log(c);
