function f(o) {
    return "o" in o;
}
var o = { o: 42 };
console.log(f(o) ? "PASS" : "FAIL");
