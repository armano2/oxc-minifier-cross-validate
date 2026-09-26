try {
    var con = console;
} catch (x) {}
global.log = con.log;
var jump = function(x) {
    console.log("JUMP:", x * 10);
    return x + x;
};
var jump2 = jump;
var run = function(x) {
    console.log("RUN:", x * -10);
    return x * x;
};
var run2 = run;
var bar = (x, y) => {
    console.log("BAR:", x + y);
    return x - y;
};
var bar2 = bar;
var obj = {
    foo: bar2,
    go: run2,
    not_used: jump2,
};
console.log(obj.foo(1, 2), global.log("PASS"));
