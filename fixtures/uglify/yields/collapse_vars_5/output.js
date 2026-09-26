var a = function* f(b, c) {
    b = yield c = b;
    console.log(c);
}("PASS");
a.next();
a.next("FAIL");
