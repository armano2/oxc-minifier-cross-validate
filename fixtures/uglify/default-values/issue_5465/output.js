a = "FAIL 1",
void function(c = b = "FAIL 2") {
    this && console.log(b || "PASS");
}(42 - a && a);
var a, b;
