var o = console;
log = o.log;
o = function(a) {
    console.log(a ? "PASS" : "FAIL");
    return a;
};
log(o(42));
