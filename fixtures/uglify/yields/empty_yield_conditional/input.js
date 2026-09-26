var a = function*() {
    console.log((yield) ? yield : yield);
}();
console.log(a.next("FAIL 1").value);
console.log(a.next("FAIL 2").value);
console.log(a.next("PASS").value);
console.log(a.next("FAIL 3").done);
