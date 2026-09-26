var a = "FAIL 1";
var b, c, e;
b = +a,
function() {
    if (console)
        return;
    c = "FAIL 2";
}(),
console.log(c || "PASS"),
e = function() {
    while (b && e);
}(),
void 0;
