function f(a) {
    var b;
    return a ? b++ ? "FAIL" : void 0 : "PASS";
}
console.log(f());
