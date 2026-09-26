var log = console.log;
var a = {
    p: "PASS",
};
log(a = a.q ? a: a.p);
