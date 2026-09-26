function f(o) {
    console.log(o.p);
}
var a;
(a = Object({ p: "PASS" })).q = true;
f(a, true);
