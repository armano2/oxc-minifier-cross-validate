var log = console.log;
var a, b = 0, c = 0;
(function() {
    a = b;
})(b++, (b++, c++));
log(a, b, c);
