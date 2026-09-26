var a = "FAIL";
function f() {
    typeof b === "number";
    delete a;
}
var b = f(a = "PASS");
console.log(a);
