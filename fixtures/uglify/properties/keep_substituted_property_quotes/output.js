function f(o) {
    var a = "p";
    return o["p"];
}
console.log(f({ p: "PASS" }));
