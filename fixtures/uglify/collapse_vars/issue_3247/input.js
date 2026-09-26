function f(o) {
    console.log(o.p);
}
var a;
a = Object({ p: "PASS" });
a.q = true;
f(a, true);
