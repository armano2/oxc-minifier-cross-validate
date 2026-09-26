function f(o) {
    var a = "p";
    return o[a];
}
console.log(f({ p: "PASS" }));
