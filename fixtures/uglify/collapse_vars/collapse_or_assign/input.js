var log = console.log;
var a = {
    p: "PASS",
};
a.q || (a = a.p);
log(a);
