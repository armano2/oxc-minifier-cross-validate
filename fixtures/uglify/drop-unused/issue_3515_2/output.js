var a = "FAIL";
function f() {
    delete a;
}
f(a = "PASS");
console.log(a);
