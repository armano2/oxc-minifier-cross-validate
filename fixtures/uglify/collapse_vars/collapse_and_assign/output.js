var log = console.log;
var a = {
    p: "PASS",
};
log(a = console ? a.p : a);
