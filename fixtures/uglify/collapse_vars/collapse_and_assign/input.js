var log = console.log;
var a = {
    p: "PASS",
};
console && (a = a.p);
log(a);
