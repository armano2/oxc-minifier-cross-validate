var log = console.log;
var a, b = 0, c = 0, d = 1;
(function f() {
    a = b;
    d-- && f();
})(b++, (b++, c++));
log(a, b, c, d);
