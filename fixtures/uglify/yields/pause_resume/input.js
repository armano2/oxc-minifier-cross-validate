function* f() {
    console.log(yield "PASS");
}
var a = f();
console.log(a.next("FAIL").value);
console.log(a.next(42).done);
