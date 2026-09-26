function f1() {
    var s = "abcdef", i = 2;
    console.log.bind(console)(s.charAt(i++), s.charAt(+i), s.charAt(4), 7);
}
function f2() {
    var s = "abcdef", i = 2;
    console.log.bind(console)(s.charAt(i++), 5, s.charAt(i++), s.charAt(+i), 7);
}
function f3() {
    var s = "abcdef",
        i = 2,
        log = console.log.bind(console),
        x = s.charAt(i++),
        y = s.charAt(+i);
    log(x, s.charAt(4), y, 7);
}
function f4() {
    var i = 10;
    i += 2,
    i += 3,
    i += 4;
    console.log.bind(console)(12, 19, 15, 19);
}
f1(), f2(), f3(), f4();
